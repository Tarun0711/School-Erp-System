// Import Mongoose
const mongoose = require('mongoose');

// Define FeeCategory schema
const StudentFeeProfileSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    feeStructures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FeeStructure' }],
    payments: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Payment'
    }],
    // Add any additional fields as needed
});

module.exports = mongoose.model('StudentFeeProfile', StudentFeeProfileSchema);
