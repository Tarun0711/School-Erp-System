const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user.js'); // Assuming you have a User model

const authMiddleware = (allowedRoles = []) => {
    return async (req, res, next) => {
        console.log(req.body)
        // Verify JWT token
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }

        try {
            const decodedToken = jwt.verify(token, config.auth.jwtSecret);


            // Fetch user details based on the user ID stored in the token
            const user = await User.findById(decodedToken.id);

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized: User not found' });
            }

            req.user = user; // Store user details in request object
        } catch (error) {
            return res.status(401).json({ message: `Unauthorized: Invalid token - ${error.message}` });
        }

        // If no roles are provided, proceed to the next middleware
        if (allowedRoles.length === 0) {
            return next();
        }

        // Check if user has a role that is allowed to access the route
        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }

        next();
    };
};

module.exports = authMiddleware;
