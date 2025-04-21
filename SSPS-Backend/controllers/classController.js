// Import necessary modules
const Class = require('../models/class.js');

// Controller methods
const classController = {
    // Create a new class
    createClass: async (req, res) => {
        try {
            const { name, sections } = req.body;
            // Create a new class
            const newClass = new Class({
                name,
                sections
            });
            // Save the new class to the database
            const savedClass = await newClass.save();
            res.status(201).json(savedClass);
        } catch (error) {
            console.error('Error creating class:', error);
            res.status(500).json({ error: 'Failed to create class' });
        }
    },

    // Get all classes
    getAllClasses: async (req, res) => {
        try {
            // Retrieve all classes from the database
            const classes = await Class.find();
            res.status(200).json(classes);
        } catch (error) {
            console.error('Error fetching classes:', error);
            res.status(500).json({ error: 'Failed to fetch classes' });
        }
    },

    // Get a single class by ID
    getClassById: async (req, res) => {
        try {
            const classId = req.params.id;
            // Retrieve the class from the database by ID
            const classObj = await Class.findById(classId);
            if (!classObj) {
                return res.status(404).json({ error: 'Class not found' });
            }
            res.status(200).json(classObj);
        } catch (error) {
            console.error('Error fetching class by ID:', error);
            res.status(500).json({ error: 'Failed to fetch class' });
        }
    },

    // Update a class by ID
    updateClassById: async (req, res) => {
        try {
            const classId = req.params.id;
            const { name, sections } = req.body;
            // Update the class in the database by ID
            const updatedClass = await Class.findByIdAndUpdate(
                classId,
                { name, sections },
                { new: true }
            );
            if (!updatedClass) {
                return res.status(404).json({ error: 'Class not found' });
            }
            res.status(200).json(updatedClass);
        } catch (error) {
            console.error('Error updating class by ID:', error);
            res.status(500).json({ error: 'Failed to update class' });
        }
    },

    // Delete a class by ID
    deleteClassById: async (req, res) => {
        try {
            const classId = req.params.id;
            // Delete the class from the database by ID
            const deletedClass = await Class.findByIdAndDelete(classId);
            if (!deletedClass) {
                return res.status(404).json({ error: 'Class not found' });
            }
            res.status(200).json({ message: 'Class deleted successfully' });
        } catch (error) {
            console.error('Error deleting class by ID:', error);
            res.status(500).json({ error: 'Failed to delete class' });
        }
    }
};

// Export the controller
module.exports = classController;
