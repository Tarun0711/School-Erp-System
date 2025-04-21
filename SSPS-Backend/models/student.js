const mongoose = require('mongoose');

// Define the schema for student
const studentSchema = new mongoose.Schema({
  admission_Number: {
    type: String,
    required: true
  },
  roll_Number: {
    type: Number,
    required: true
  },
  first_Name: {
    type: String,
    required: true
  },
  last_Name: {
    type: String,
    required: true
  },
  class_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class', // Reference to the Class model
    required: true
  },
  section: {
    type: String,

  },
  session: {
    type: String, // Assuming session is a string, change to Date if it's a date
    required: true
  },
  date_Of_Birth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  permanent_Address: {
    type: String,
    required: true
  },
  address_For_Correspondence: {
    type: String,

  },
  contact_Number: {
    type: String,
    required: true
  },
  alternet_Contact_Number: {
    type: String,

  },
  email: {
    type: String,

  },
  nationality: {
    type: String,
    required: true
  },
  religion: {
    type: String,

  },
  category: {
    type: String,
    required: true
  },
  date_Of_Admission: {
    type: Date,
    required: true
  },
  blood_Group: {
    type: String,

  },
  father_Name: {
    type: String,
    required: true
  },
  father_Occupation: {
    type: String,

  },
  mother_Name: {
    type: String,
    required: true
  },
  mother_Occupation: {
    type: String,

  },
  student_Photo: {
    type: String, // Assuming binary data for the photo
    required: true
  },
  aadhar_number: {
    type: String,

  },
  due_amount: {
    type: Number,

  },

  // You can add more fields like attendance, grades, etc. here
}, { timestamps: true });

// Create a model from the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
