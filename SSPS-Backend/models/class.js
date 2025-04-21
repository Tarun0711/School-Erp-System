const mongoose = require('mongoose');

// Define the schema for class
const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Enforces uniqueness
  },
  sections: [
    {
      type: String
    }
  ],

  // You can add more fields like subject, schedule, etc. here
}, { timestamps: true });

// Create a model from the schema
const Class = mongoose.model('Class', classSchema);

module.exports = Class;
