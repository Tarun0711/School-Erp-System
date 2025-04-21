const Section = require('../models/section.js');

// Controller for handling CRUD operations on sections
const sectionController = {
    // Create a new section
    createSection: async (req, res) => {
        try {
            const { name } = req.body;
            const section = new Section({ name });
            await section.save();
            res.status(201).json({ message: 'Section created successfully', section });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create section' });
        }
    },

    // Get all sections
    getAllSections: async (req, res) => {
        try {
            const sections = await Section.find();
            res.status(200).json(sections);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch sections' });
        }
    },

    // Get a specific section by ID
    getSectionById: async (req, res) => {
        try {
            const { id } = req.params;
            const section = await Section.findById(id);
            if (!section) {
                return res.status(404).json({ error: 'Section not found' });
            }
            res.status(200).json(section);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch section' });
        }
    },

    // Update a section
    updateSection: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const section = await Section.findByIdAndUpdate(id, { name }, { new: true });
            if (!section) {
                return res.status(404).json({ error: 'Section not found' });
            }
            res.status(200).json({ message: 'Section updated successfully', section });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update section' });
        }
    },

    // Delete a section
    deleteSection: async (req, res) => {
        try {
            const { id } = req.params;
            const section = await Section.findByIdAndDelete(id);
            if (!section) {
                return res.status(404).json({ error: 'Section not found' });
            }
            res.status(200).json({ message: 'Section deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete section' });
        }
    }
};

module.exports = sectionController;
