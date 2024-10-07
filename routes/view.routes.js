import express from 'express';
import {
    viewAllPosts,
    viewUserLogin,
    viewUserRegister,
    viewSinglePost,
    viewUsers,
    getCurrentUser,
} from '../controllers/view.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', auth, getCurrentUser);

router.get('/posts', viewAllPosts);
router.get('/posts/:id', auth, viewSinglePost);
router.get('/user/login', viewUserLogin);
router.get('/users', viewUsers);
router.get('/user/register', viewUserRegister);
router.get('/feed', auth, (req, res) => {
    return res.render('feed');
});
export default router;
