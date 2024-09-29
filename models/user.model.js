import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: { type: String }, // URL or file path
        bio: { type: String, maxLength: [250, 'Max Length 250'], default: '' }, // Short description
        socialLinks: { type: String, default: '' }, // Links to other profiles
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // Reference to post
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model('User', userSchema);
