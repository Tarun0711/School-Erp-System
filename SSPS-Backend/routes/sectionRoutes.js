const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');
const authMiddleware = require("../middleware/auth.js");

// Create a new section
router.post('/add', authMiddleware(["admin", "moderator"]), sectionController.createSection);

// Get all sections
router.get('/getAll', authMiddleware(["admin", "moderator"]), sectionController.getAllSections);

// Get a specific section by ID
router.get('/get/:id', authMiddleware(["admin", "moderator"]), sectionController.getSectionById);

// Update a section
router.put('/update/:id', authMiddleware(["admin", "moderator"]), sectionController.updateSection);

// Delete a section
router.delete('/delete/:id', authMiddleware(["admin", "moderator"]), sectionController.deleteSection);



module.exports = router;
