// models/Admin.js

const mongoose = require('mongoose');

// Define the schema for the Admin model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    fullName: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: "admin",
        enum: ["admin", "moderator"]
    },
});

// Create and export the Admin model
module.exports = mongoose.model('User', userSchema);
