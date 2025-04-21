// models/parent.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the parent
const parentSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

// Create the Parent model using the schema
const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;
