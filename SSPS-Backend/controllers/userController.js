const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');

exports.addUser = async (req, res) => {
    const { username, password, email, fullName, role } = req.body;

    // Check if username, password, and role are provided
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Username, password, and role are required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            email: email || null,
            fullName: fullName || null,
            role: role
        });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', result: { username, password } });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        // Fetch all users
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        // Fetch user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, password, email, fullName, role } = req.body;
    try {
        // Check if user exists
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.username = username || user.username;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        user.email = email || user.email;
        user.fullName = fullName || user.fullName;
        user.role = role || user.role;

        // Save updated user
        await user.save();

        res.status(200).json({ message: 'User updated successfully', result: user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete user
        await user.deleteOne(); // Use deleteOne method instead of remove

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

