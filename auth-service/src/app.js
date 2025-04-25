// auth-service/src/app.js
const express = require('express');
const cors = require('cors'); // Import cors
const { authRouter } = require('./routes/auth');
const { connectDB } = require('./config/database');

const app = express();
app.use(express.json());



// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins, you can restrict this to specific origins if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

// Connect to database
connectDB();

// Use auth routes
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));

console.log('JWT_SECRET:', process.env.JWT_SECRET);




