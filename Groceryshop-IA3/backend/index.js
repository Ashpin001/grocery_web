const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Apply routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Configure Mongoose
mongoose.set('strictQuery', false);

// Start server function
async function startServer() {
    try {
        // Connect directly with Mongoose
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            dbName: 'grocerystore',
            directConnection: true
        });

        console.log('✅ MongoDB connected successfully!');
        
        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        // Wait 5 seconds and retry
        console.log('Retrying connection in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        return startServer();
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
    }
    process.exit(0);
});

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connection established');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected');
});

// Start the server
startServer().catch(err => {
    console.error('Fatal error:', err.message);
    process.exit(1);
});