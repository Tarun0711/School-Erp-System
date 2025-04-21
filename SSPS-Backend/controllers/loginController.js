// controllers/loginController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Parent = require('../models/parent');
const config = require('../config/config');

exports.userLogin = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        let user;

        // Determine which model to use based on the role provided
        if (role === 'admin' || role === 'moderator') {
            user = await User.findOne({ username });
        } else if (role === 'parent') {
            user = await Parent.findOne({ username });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password with hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Omitting the password field from the user object
        const { password: omitPassword, ...userData } = user.toObject();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, config.auth.jwtSecret, { expiresIn: config.auth.tokenExpiration });

        // Log successful login attempt
        console.log(`User with username ${username} and role ${role} logged in successfully`);

        // Sending response without the password
        res.json({ result: userData, token, message: "Successful Login" });
    } catch (error) {
        console.error('User login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
