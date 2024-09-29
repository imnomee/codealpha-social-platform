import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import { createPost, getPosts } from '../controllers/post.controller.js';
const router = express.Router();

router.post('/createPost', auth, createPost);
router.get('/getPosts', auth, getPosts);

export default router;
