const bcrypt = require('bcrypt');
const Parent = require('../models/parent.js');


exports.addParent = async (req, res) => {
    const { username, password, email, fullName, students } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new parent
        const newParent = new Parent({
            username,
            password: hashedPassword,
            email: email || null,
            fullName: fullName || null,
            students: students || []
        });
        await newParent.save();

        res.status(201).json({ message: 'Parent created successfully', result: { username } });
    } catch (error) {
        console.error('Error adding parent:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getParents = async (req, res) => {
    try {
        // Fetch all parents
        const parents = await Parent.find();
        res.status(200).json(parents);
    } catch (error) {
        console.error('Error fetching parents:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getParentById = async (req, res) => {
    const parentId = req.params.id;
    try {
        // Fetch parent by ID
        const parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }
        res.status(200).json(parent);
    } catch (error) {
        console.error('Error fetching parent by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateParent = async (req, res) => {
    const parentId = req.params.id;
    const { username, password, email, fullName } = req.body;
    try {
        // Check if parent exists
        let parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }

        // Update parent fields
        parent.username = username || parent.username;
        if (password) {
            parent.password = password;
        }
        parent.email = email || parent.email;
        parent.fullName = fullName || parent.fullName;

        // Save updated parent
        await parent.save();

        res.status(200).json({ message: 'Parent updated successfully', result: parent });
    } catch (error) {
        console.error('Error updating parent:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteParent = async (req, res) => {
    const parentId = req.params.id;
    try {
        // Check if parent exists
        const parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }

        // Delete parent
        await parent.deleteOne();

        res.status(200).json({ message: 'Parent deleted successfully' });
    } catch (error) {
        console.error('Error deleting parent:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
