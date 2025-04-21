const express = require('express');
const {
    getStudentFeeProfile,
    updateStudentFeeProfile
} = require("../controllers/studentFeeProfile.js");
const authMiddleware = require("../middleware/auth.js");

const router = express.Router();

// Get student's fee profile by student ID
router.get('/feeProfile/:studentId', authMiddleware(), getStudentFeeProfile);

// Update student's fee profile by student ID
router.put('/feeProfile/:studentId', authMiddleware(), updateStudentFeeProfile);

module.exports = router;
