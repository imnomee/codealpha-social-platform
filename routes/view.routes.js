import express from 'express';
import {
    viewAllPosts,
    viewUserLogin,
    viewUserRegister,
    viewSinglePost,
} from '../controllers/view.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).render('home', { title: 'Home Page' });
});

router.get('/posts', viewAllPosts);
router.get('/posts/:id', viewSinglePost);
router.get('/user/login', viewUserLogin);
router.get('/user/register', viewUserRegister);
export default router;
