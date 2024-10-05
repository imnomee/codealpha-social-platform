import express from 'express';

const router = express.Router();

router.get('/users/login', (req, res) => {
    return res.render('login', { title: 'Login' });
});

router.get('/users/register', (req, res) => {
    console.log(req);
    res.render('register', { title: 'Register' });
});

export default router;
