import { Post } from '../models/post.model.js';

export const createPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.userId;

    try {
        const newPost = await Post({ userId, content });
        await newPost.save();

        return res
            .status(201)
            .json({ msg: 'creatPost: created successfully', newPost });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json('creatPost: error');
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username');
        const postsCount = await Post.estimatedDocumentCount();
        //   const formattedPosts = posts.map((post) => ({
        //       username: post.userId.username,
        //       content: post.content, // Assuming content is the field name in your Post schema
        //   }));
        return res.status(200).json({ postsCount, posts });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json('getPostsByUser: error');
    }
};
