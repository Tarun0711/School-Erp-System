const mongoose = require('mongoose');

// Define the schema for section
const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Create a model from the schema
const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
