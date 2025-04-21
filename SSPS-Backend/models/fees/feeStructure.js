// Import Mongoose
const mongoose = require('mongoose');

// Define FeeStructure schema
const FeeStructureSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the fee structure
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', }, // Reference to the class associated with the fee structure
    feeGroups: [{
        feeType: { type: String, required: true }, // Reference to the fee type
        amount: { type: Number, required: true }, // Amount of the fee
        dueDate: { type: Date, required: true }
    } // Due date of the fee] // Array of fee groups with fee type, amount, and due date
    ]
});

// Export model
const FeeStructure = mongoose.model('FeeStructure', FeeStructureSchema);

module.exports = FeeStructure;
