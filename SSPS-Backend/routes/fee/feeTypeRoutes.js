// Import necessary modules
const express = require('express');
const feeTypeController = require('../../controllers/fees/feesTypeController.js');
const authMiddleware = require("../../middleware/auth.js");

// Create a new router instance
const router = express.Router();

// Define routes for fee types
router.post('/feetypes/add', authMiddleware(["admin", "moderator"]), feeTypeController.createFeeType);
router.get('/feetypes/getAll', authMiddleware(["admin", "moderator"]), feeTypeController.getAllFeeTypes);
router.get('/feetypes/get/:id', authMiddleware(["admin", "moderator"]), feeTypeController.getFeeTypeById);
router.put('/feetypes/update/:id', authMiddleware(["admin", "moderator"]), feeTypeController.updateFeeTypeById);
router.delete('/feetypes/delete/:id', authMiddleware(["admin", "moderator"]), feeTypeController.deleteFeeTypeById);

// Export the router
module.exports = router;
