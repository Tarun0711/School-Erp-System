const StudentFeeProfile = require('../models/fees/studentFeeProfile.js');

exports.getStudentFeeProfile = async (req, res) => {
    console.log("request received")
    const studentId = req.params.studentId;
    try {
        // Fetch student's fee profile by student ID
        const feeProfile = await StudentFeeProfile.findOne({ studentId }).populate("feeStructures");
        if (!feeProfile) {
            return res.status(404).json({ message: 'Fee profile not found' });
        }
        res.status(200).json(feeProfile);
    } catch (error) {
        console.error('Error fetching fee profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateStudentFeeProfile = async (req, res) => {
    const studentId = req.params.studentId;
    const { feeStructures, payments } = req.body;
    try {
        // Fetch student's fee profile by student ID
        let feeProfile = await StudentFeeProfile.findOne({ studentId });
        if (!feeProfile) {
            return res.status(404).json({ message: 'Fee profile not found' });
        }

        // Update fee profile fields
        feeProfile.feeStructures = feeStructures || feeProfile.feeStructures;
        feeProfile.payments = payments || feeProfile.payments;

        // Save updated fee profile
        await feeProfile.save();

        res.status(200).json({ message: 'Fee profile updated successfully', result: feeProfile });
    } catch (error) {
        console.error('Error updating fee profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
