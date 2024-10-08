import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Follow } from '../models/follow.model.js';

// User Registration Controller
export const userRegister = async (req, res) => {
    // Destructure the request body to get user details
    const { username, email, password } = req.body;

    try {
        // Check if user already exists in the database by email
        let user = await User.findOne({ email });
        if (user)
            return res.status(400).render('register', {
                title: 'Register',
                msg: 'User Already exists.',
            });

        user = await User.findOne({ username });
        if (user)
            return res.status(400).render('register', {
                title: 'Register',
                msg: 'User Already exists.',
            });

        // Generate a salt and hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance and save it to the database
        user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Respond with a success message and user details (excluding password)
        return res.status(201).json({
            msg: 'User registered successfully',
            user: { username, email },
        });
    } catch (error) {
        // Log any errors and return a server error response
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// User Login Controller
export const userLogin = async (req, res) => {
    // Destructure the request body to get login credentials
    const { email, password } = req.body;

    try {
        // Find user by email in the database
        let user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'User does not exist.' });

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: 'Invalid email or password' });

        // Create a JWT token with user ID and a specified expiration time
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d', // Token expires in 1 hour
        });
        // Set the token in a cookie and respond with a success message

        res.cookie('token', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // Cookie valid for 1 day
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            sameSite: 'strict', // Mitigates CSRF attacks
        });
        return res
            .status(200)
            .json({ msg: 'Login successful, token set in cookies' });
    } catch (error) {
        // Log any errors and return a server error response
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('posts', 'content likes comments')
            .select('username bio profilePicture');
        if (!user)
            return res
                .status(404)
                .json({ msg: 'getUserProfile: no user found' });

        return res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

/*
TODO: Profile Picture Upload
For uploading a profile picture, you can integrate file upload functionality (e.g., using multer for handling file uploads).
*/

export const updateUserProfile = async (req, res) => {
    const { bio, socialLinks, profilePicture } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        user.bio = bio || user.bio;
        user.socialLinks = socialLinks || user.socialLinks;
        user.profilePicture = profilePicture || user.profilePicture;

        await user.save();

        return res
            .status(200)
            .json({ msg: 'Profile updated successfully.', user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const followUser = async (req, res) => {
    const { userId } = req.params; //user to get followed
    const followerId = req.userId; //user whoe is going to follow
    try {
        const follow = new Follow({ follower: followerId, following: userId });
        await follow.save();

        return res.status(200).json({ msg: 'Successfully followed the user' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
export const unFollowUser = async (req, res) => {
    const { userId } = req.params; //user to get followed
    const followerId = req.userId; //user whoe is going to follow
    try {
        await Follow.findOneAndDelete({
            follower: followerId,
            following: userId,
        });
        return res
            .status(200)
            .json({ msg: 'Successfully unfollowed the user' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
