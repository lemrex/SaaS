import redis
import os
import logging
from functools import wraps
from time import sleep

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class RedisConnectionError(Exception):
    """Custom exception for Redis connection issues"""
    pass

class RedisConfig:
    def __init__(self):
        self.host = os.getenv('REDIS_HOST', 'localhost')
        self.port = int(os.getenv('REDIS_PORT', 6379))
        self.password = os.getenv('REDIS_PASSWORD')
        self.db = int(os.getenv('REDIS_DB', 0))
        self.ssl = os.getenv('REDIS_SSL', 'false').lower() == 'true'
        self.timeout = int(os.getenv('REDIS_TIMEOUT', 5))
        self.max_retries = int(os.getenv('REDIS_MAX_RETRIES', 3))
        self.retry_delay = int(os.getenv('REDIS_RETRY_DELAY', 1))

def retry_on_failure(max_retries=3, delay=1):
    """Decorator to retry Redis operations on connection failure"""
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_retries):
                try:
                    return f(*args, **kwargs)
                except (redis.ConnectionError, redis.TimeoutError) as e:
                    last_exception = e
                    logger.warning(f"Attempt {attempt + 1} failed: {str(e)}")
                    if attempt < max_retries - 1:
                        sleep(delay)
            raise RedisConnectionError(f"Operation failed after {max_retries} attempts") from last_exception
        return wrapper
    return decorator

class RedisClient:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(RedisClient, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance
    
    def _initialize(self):
        self.config = RedisConfig()
        self._client = None
        self.connect()
    
    def connect(self):
        """Establish Redis connection with retry logic"""
        for attempt in range(self.config.max_retries):
            try:
                self._client = redis.Redis(
                    host=self.config.host,
                    port=self.config.port,
                    password=self.config.password,
                    db=self.config.db,
                    ssl=self.config.ssl,
                    socket_timeout=self.config.timeout,
                    socket_connect_timeout=self.config.timeout,
                    health_check_interval=30,
                    retry_on_timeout=True,
                    socket_keepalive=True
                )
                # Test connection
                if self._client.ping():
                    logger.info("Successfully connected to Redis")
                    return
            except Exception as e:
                logger.error(f"Connection attempt {attempt + 1} failed: {str(e)}")
                if attempt < self.config.max_retries - 1:
                    sleep(self.config.retry_delay)
        
        raise RedisConnectionError(f"Could not connect to Redis after {self.config.max_retries} attempts")
    
    @retry_on_failure()
    def get(self, key):
        """Safe get with retry"""
        return self._client.get(key)
    
    @retry_on_failure()
    def set(self, key, value, ex=None):
        """Safe set with retry"""
        return self._client.set(key, value, ex=ex)
    
    # Add other Redis methods as needed
    
    @property
    def client(self):
        """Get raw Redis client with health check"""
        if not self._client or not self._client.ping():
            self.connect()
        return self._client

# Singleton instance
try:
    redis_client = RedisClient()
except RedisConnectionError as e:
    logger.error(f"Failed to initialize Redis client: {str(e)}")
    redis_client = None

def get_redis_client():
    """Get the Redis client instance with health check"""
    if redis_client is None:
        logger.error("Redis client is not available")
        return None
    
    try:
        if redis_client.client.ping():
            return redis_client.client
    except Exception as e:
        logger.error(f"Redis connection check failed: {str(e)}")
    
    return None