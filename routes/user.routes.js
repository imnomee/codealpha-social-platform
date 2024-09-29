import express from 'express';
import {
    getUserProfile,
    updateUserProfile,
    userLogin,
    userRegister,
} from '../controllers/user.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

// Register Route
// Handles user registration by calling the userRegister controller
router.post('/register', userRegister);

// Login Route
// Handles user login by calling the userLogin controller
router.post('/login', userLogin);

router.get('/:id', auth, getUserProfile);
router.post('/update', auth, updateUserProfile);

export default router; // Export the router for use in the main app
