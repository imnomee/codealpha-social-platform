import express from 'express';
import { userLogin, userRegister } from '../controllers/user.controller.js';

const router = express.Router();

// Register Route
// Handles user registration by calling the userRegister controller
router.post('/register', userRegister);

// Login Route
// Handles user login by calling the userLogin controller
router.post('/login', userLogin);

export default router; // Export the router for use in the main app
