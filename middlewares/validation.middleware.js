import { check } from 'express-validator';

export const validateCreatePost = [
    check('content')
        .isLength({ min: 1 })
        .withMessage('Content is required')
        .isLength({ max: 250 })
        .withMessage('Content cannot exceed more than 250 characters'),
];
