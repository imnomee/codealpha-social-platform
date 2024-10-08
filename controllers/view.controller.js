import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';

export const viewAllPosts = async (req, res) => {
    //get all posts from collection
    const posts = await Post.find().populate('userId', 'username');
    //build templates

    //render template using the data from collection
    return res.status(200).render('posts', { title: 'Posts', posts });
};

export const viewUsers = async (req, res) => {
    const users = await User.find().select('username');
    return res.status(200).render('users', { title: 'Users', users });
};

export const viewSinglePost = async (req, res) => {
    if (!req.cookies.token) {
        return res.status(400).redirect('/user/login');
    }
    //get post from collection
    const post = await Post.findById(req.params.id).populate(
        'userId',
        'username'
    );
    //render using colleciton
    return res.status(200).render('post', { title: 'Single Post', post });
};

export const viewUserLogin = (req, res) => {
    return res.status(200).render('login', { title: 'Login' });
};

export const viewUserRegister = (req, res) => {
    return res.status(200).render('register', { title: 'Register' });
};

export const getCurrentUser = async (req, res) => {
    // const userId = req.userId || '';
    // const user = await User.findById(userId).select(
    //     '-_id email username createdAt bio'
    // );
    // if (!userId || !user) {
    //     return res.status(200).render('home', { title: 'Home: No User' });
    // }
    return res.status(200).render('home', { title: 'Home' });
};
