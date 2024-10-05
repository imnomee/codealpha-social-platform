import jwt from 'jsonwebtoken';

// Authentication Middleware
const auth = (req, res, next) => {
    // Retrieve the token from cookies
    const token = req.cookies.token;

    // Check if the token is provided
    if (!token)
        return res
            .status(400)
            .json({ msg: 'Auth: No token, auth denied. Login to continue' });

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Store the user ID in the request object for further use
        req.userId = decoded.userId;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Log any errors and return an invalid token response
        console.error(error.message);
        res.status(500).json({ msg: 'Auth: Token is invalid' });
    }
};

export default auth; // Export the authentication middleware for use in routes
