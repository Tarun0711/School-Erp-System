// Import necessary modules
const express = require('express');
const feeStructureController = require('../../controllers/fees/feeStructureController.js');
const authMiddleware = require("../../middleware/auth.js");

// Create a new router instance
const router = express.Router();

// Define routes for fee structures
router.post('/feestructure/add', authMiddleware(["admin", "moderator"]), feeStructureController.createFeeStructure);
router.get('/feestructure/getAll', authMiddleware(["admin", "moderator"]), feeStructureController.getAllFeeStructures);
router.get('/feestructure/get/:id', authMiddleware(["admin", "moderator"]), feeStructureController.getFeeStructureById);
router.put('/feestructure/update/:id', authMiddleware(["admin", "moderator"]), feeStructureController.updateFeeStructureById);
router.delete('/feestructure/delete/:id', authMiddleware(["admin", "moderator"]), feeStructureController.deleteFeeStructureById);

// Export the router
module.exports = router;
