// Import necessary modules
const express = require('express');
const classController = require('../controllers/classController.js');
const authMiddleware = require("../middleware/auth.js");

// Create a new router instance
const router = express.Router();

// Define routes for classes
router.post('/add', authMiddleware(["admin", "moderator"]), classController.createClass);
router.get('/getAll', authMiddleware(["admin", "moderator"]), classController.getAllClasses);
router.get('/get/:id', authMiddleware(["admin", "moderator"]), classController.getClassById);
router.put('/update/:id', authMiddleware(["admin", "moderator"]), classController.updateClassById);
router.delete('/delete/:id', authMiddleware(["admin", "moderator"]), classController.deleteClassById);

// Export the router
module.exports = router;
