import mongoose, { mongo } from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: 'String',
            required: true,
            minLength: [1, 'Post can have at least one character.'],
            maxLength: [250, 'Post can have maximum 250 characters'],
        },
        likes: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
        ],
        comments: [
            {
                userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
                comment: {
                    type: String,
                    required: true,
                    minLength: [1, 'Post can have at least one character.'],
                    maxLength: [250, 'Post can have maximum 250 characters'],
                },
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Post = mongoose.model('Post', postSchema);
