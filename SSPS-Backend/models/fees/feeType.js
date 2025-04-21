// Import Mongoose
const mongoose = require('mongoose');

// Define FeeCategory schema
const FeeTypeSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the fee category (e.g., "Tuition Fee", "Transportation Fee")
    description: { type: String }, // Description of the fee category
    // Add any additional fields as needed
});

module.exports = mongoose.model('FeeType', FeeTypeSchema);
