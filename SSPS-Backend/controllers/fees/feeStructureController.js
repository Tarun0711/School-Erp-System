// Import necessary modules
const FeeStructure = require('../../models/fees/feeStructure.js');

// Controller methods
const feeStructureController = {
    // Create a new fee structure
    createFeeStructure: async (req, res) => {
        try {
            const { name, class: classId, feeGroups } = req.body;
            // Create a new fee structure
            const newFeeStructure = new FeeStructure({
                name,
                class: classId,
                feeGroups
            });
            // Save the new fee structure to the database
            const savedFeeStructure = await newFeeStructure.save();
            res.status(201).json(savedFeeStructure);
        } catch (error) {
            console.error('Error creating fee structure:', error);
            res.status(500).json({ error: 'Failed to create fee structure' });
        }
    },

    // Get all fee structures
    getAllFeeStructures: async (req, res) => {
        try {
            // Retrieve all fee structures from the database
            const feeStructures = await FeeStructure.find().populate('class')
            res.status(200).json(feeStructures);
        } catch (error) {
            console.error('Error fetching fee structures:', error);
            res.status(500).json({ error: 'Failed to fetch fee structures' });
        }
    },

    // Get a single fee structure by ID
    getFeeStructureById: async (req, res) => {
        try {
            const feeStructureId = req.params.id;
            // Retrieve the fee structure from the database by ID
            const feeStructure = await FeeStructure.findById(feeStructureId).populate('class');
            if (!feeStructure) {
                return res.status(404).json({ error: 'Fee structure not found' });
            }
            res.status(200).json(feeStructure);
        } catch (error) {
            console.error('Error fetching fee structure by ID:', error);
            res.status(500).json({ error: 'Failed to fetch fee structure' });
        }
    },

    // Update a fee structure by ID
    updateFeeStructureById: async (req, res) => {
        try {
            const feeStructureId = req.params.id;
            const { name, class: classId, feeGroups } = req.body;
            // Update the fee structure in the database by ID
            const updatedFeeStructure = await FeeStructure.findByIdAndUpdate(
                feeStructureId,
                { name, class: classId, feeGroups },
                { new: true }
            );
            if (!updatedFeeStructure) {
                return res.status(404).json({ error: 'Fee structure not found' });
            }
            res.status(200).json(updatedFeeStructure);
        } catch (error) {
            console.error('Error updating fee structure by ID:', error);
            res.status(500).json({ error: 'Failed to update fee structure' });
        }
    },

    // Delete a fee structure by ID
    deleteFeeStructureById: async (req, res) => {
        try {
            const feeStructureId = req.params.id;
            // Delete the fee structure from the database by ID
            const deletedFeeStructure = await FeeStructure.findByIdAndDelete(feeStructureId);
            if (!deletedFeeStructure) {
                return res.status(404).json({ error: 'Fee structure not found' });
            }
            res.status(200).json({ message: 'Fee structure deleted successfully' });
        } catch (error) {
            console.error('Error deleting fee structure by ID:', error);
            res.status(500).json({ error: 'Failed to delete fee structure' });
        }
    }
};

// Export the controller
module.exports = feeStructureController;
