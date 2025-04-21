const express = require('express');
const {
    addStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentsByClass,
    getStudentsByClassAndSection,
    getStudentsByQuery,
    getStudentsByClassOrSection,
    getLastGeneratedAdmissionNumber
} = require("../controllers/studentController");
const authMiddleware = require("../middleware/auth.js");

const router = express.Router();

// CRUD operations for students
router.post('/addStudent', authMiddleware(["admin", "moderator"]), addStudent);
router.get('/getStudents', authMiddleware(["admin", "moderator"]), getStudents);
router.get('/getStudent/:id', authMiddleware(["admin", "moderator"]), getStudentById);
router.put('/updateStudent/:id', authMiddleware(["admin", "moderator"]), updateStudent);
router.delete('/deleteStudent/:id', authMiddleware(["admin", "moderator"]), deleteStudent);

// Additional routes for querying students
router.get('/byClass/:classId', authMiddleware(["admin", "moderator"]), getStudentsByClass);
router.get('/byClassAndSection/:classId/:section', authMiddleware(["admin", "moderator"]), getStudentsByClassAndSection);
router.get('/students/query', authMiddleware(["admin", "moderator"]), getStudentsByQuery);
router.get('/byClassOrSection/:classId/:section?', authMiddleware(["admin", "moderator"]), getStudentsByClassOrSection);
router.get('/getLastAdmissionNumber', authMiddleware(["admin", "moderator"]), getLastGeneratedAdmissionNumber);


module.exports = router;
