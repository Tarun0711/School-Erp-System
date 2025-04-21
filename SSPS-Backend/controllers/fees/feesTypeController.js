// Import necessary modules
const FeeType = require('../../models/fees/feeType.js');

// Controller methods
const feeTypeController = {
    // Create a new fee type
    createFeeType: async (req, res) => {
        try {
            const { name, description } = req.body;
            // Create a new fee type
            const newFeeType = new FeeType({
                name,
                description
            });
            // Save the new fee type to the database
            const savedFeeType = await newFeeType.save();
            res.status(201).json(savedFeeType);
        } catch (error) {
            console.error('Error creating fee type:', error);
            res.status(500).json({ error: 'Failed to create fee type' });
        }
    },

    // Get all fee types
    getAllFeeTypes: async (req, res) => {
        try {
            // Retrieve all fee types from the database
            const feeTypes = await FeeType.find();
            res.status(200).json(feeTypes);
        } catch (error) {
            console.error('Error fetching fee types:', error);
            res.status(500).json({ error: 'Failed to fetch fee types' });
        }
    },

    // Get a single fee type by ID
    getFeeTypeById: async (req, res) => {
        try {
            const feeTypeId = req.params.id;
            // Retrieve the fee type from the database by ID
            const feeType = await FeeType.findById(feeTypeId);
            if (!feeType) {
                return res.status(404).json({ error: 'Fee type not found' });
            }
            res.status(200).json(feeType);
        } catch (error) {
            console.error('Error fetching fee type by ID:', error);
            res.status(500).json({ error: 'Failed to fetch fee type' });
        }
    },

    // Update a fee type by ID
    updateFeeTypeById: async (req, res) => {
        try {
            const feeTypeId = req.params.id;
            const { name, description } = req.body;
            // Update the fee type in the database by ID
            const updatedFeeType = await FeeType.findByIdAndUpdate(
                feeTypeId,
                { name, description },
                { new: true }
            );
            if (!updatedFeeType) {
                return res.status(404).json({ error: 'Fee type not found' });
            }
            res.status(200).json(updatedFeeType);
        } catch (error) {
            console.error('Error updating fee type by ID:', error);
            res.status(500).json({ error: 'Failed to update fee type' });
        }
    },

    // Delete a fee type by ID
    deleteFeeTypeById: async (req, res) => {
        try {
            const feeTypeId = req.params.id;
            // Delete the fee type from the database by ID
            const deletedFeeType = await FeeType.findByIdAndDelete(feeTypeId);
            if (!deletedFeeType) {
                return res.status(404).json({ error: 'Fee type not found' });
            }
            res.status(200).json({ message: 'Fee type deleted successfully' });
        } catch (error) {
            console.error('Error deleting fee type by ID:', error);
            res.status(500).json({ error: 'Failed to delete fee type' });
        }
    },

    // Get fee structures filtered by class
    getFeeStructuresByClass: async (req, res) => {
        try {
            const { classId } = req.params;
            let query = {};
            // If classId is provided, filter fee structures by class
            if (classId) {
                query.class = classId;
            } else {
                // If no classId is provided, include fee structures with class value as null or empty
                query.class = { $exists: false };
            }
            // Retrieve fee structures from the database based on the query
            const feeStructures = await FeeStructure.find(query).populate('class');
            res.status(200).json(feeStructures);
        } catch (error) {
            console.error('Error fetching fee structures by class:', error);
            res.status(500).json({ error: 'Failed to fetch fee structures' });
        }
    }
};

// Export the controller
module.exports = feeTypeController;
