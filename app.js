import { configDotenv } from 'dotenv';
configDotenv();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import viewRoutes from './routes/view.routes.js';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(
    cors({
        origin: 'http://localhost:7860',
        credentials: true,
    })
);

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to handle static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to Pug
app.set('view engine', 'pug');

// Set the views directory (where your Pug templates will be stored)
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

//Frontend routes
app.use('/', viewRoutes);
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
