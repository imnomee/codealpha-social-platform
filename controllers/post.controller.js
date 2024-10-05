import { Follow } from '../models/follow.model.js';
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';

export const createPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.userId;

    try {
        const newPost = await Post({ userId, content });
        await newPost.save();

        // Add post ID to user's posts array without refetching the user
        await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });

        return res
            .status(201)
            .json({ msg: 'Post created successfully', newPost });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json('creatPost: error');
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username');
        const postsCount = await Post.estimatedDocumentCount();
        const formattedPosts = posts.map((post) => ({
            id: post._id,
            username: post.userId.username,
            content: post.content,
            likes: post.likes.length,
            comments: post.comments.length,
        }));

        return res.status(200).json({ postsCount, formattedPosts });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json('getPostsByUser: error');
    }
};

export const likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId;

    try {
        const post = await Post.findById(postId);
        if (!post)
            return res.status(404).json({ msg: 'likePost: Post not found.' });

        if (post.likes.includes(userId)) {
            post.likes.pull(userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();
        return res.status(200).json({
            likes: post.likes.length,
            post,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json('likePost: error');
    }
};

export const commentOnPost = async (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;
    const userId = req.userId;

    try {
        const post = await Post.findById(postId);
        if (!post)
            return res
                .status(404)
                .json({ msg: 'commentOnPost: Post not found.' });

        post.comments.push({ userId, comment });
        await post.save();
        return res.status(200).json({ post });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json('commentOnPost:error');
    }
};

export const getFeedPosts = async (req, res) => {
    try {
        const followerData = await Follow.find({
            follower: req.userId,
        }).populate('following', '_id');
        const followingIds = followerData.map((follow) => follow.following._id);
        const posts = await Post.find({
            userId: { $in: followingIds },
        })
            .populate('userId', 'username')
            .select('-updatedAt -__v');

        return res.status(200).json(posts);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json('commentOnPost:error');
    }
};
