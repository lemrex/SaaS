import logging
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database configuration
MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = "book_inventory"  # Change this to your actual database name

# Initialize connection objects
client = None
db = None
books_collection = None

def connect_to_mongodb():
    global client, db, books_collection
    try:
        logger.info(f"Connecting to MongoDB at: {MONGODB_URI}")
        client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
        client.server_info()  # Test connection
        db = client[DATABASE_NAME]
        books_collection = db['books']
        logger.info("Successfully connected to MongoDB")
        return True
    except Exception as e:
        logger.error(f"Error connecting to MongoDB: {e}")
        return False

def init_db():
    if books_collection is None:
        logger.error("Cannot initialize - books_collection is None")
        return False
    
    try:
        # Create indexes
        books_collection.create_index([('isbn', 1)], unique=True)
        books_collection.create_index([('user_id', 1)])
        logger.info("Database indexes created successfully")
        return True
    except Exception as e:
        logger.error(f"Error creating database indexes: {e}")
        return False

# Establish connection when module loads
if connect_to_mongodb():
    init_db()
else:
    logger.error("Failed to connect to MongoDB - application may not function properly")