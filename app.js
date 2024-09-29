import { configDotenv } from 'dotenv';
configDotenv();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/posts', postRoutes);

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the process on failure
    }
};

// Start the server
const startServer = () => {
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
        console.log(`Server is running on: http://localhost:${port}`)
    );
};

// Run the application
const runApp = async () => {
    await connectDB();
    startServer();
};

runApp();
