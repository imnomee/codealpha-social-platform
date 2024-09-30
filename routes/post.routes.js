import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import {
    commentOnPost,
    createPost,
    getFeedPosts,
    getPosts,
    likePost,
} from '../controllers/post.controller.js';
const router = express.Router();

router.post('/createPost', auth, createPost);
router.post('/:postId/like', auth, likePost);
router.post('/:postId/comment', auth, commentOnPost);
router.get('/getPosts', auth, getPosts);
router.get('/getFeedPosts', auth, getFeedPosts);

export default router;
