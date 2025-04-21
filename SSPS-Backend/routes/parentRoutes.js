const express = require('express');
const {
    addParent,
    getParents,
    getParentById,
    updateParent,
    deleteParent
} = require("../controllers/parentController");
const authMiddleware = require("../middleware/auth.js");

const router = express.Router();

router.post('/addParent', authMiddleware(["admin","moderator"]), addParent);
router.get('/getParents', authMiddleware(["admin","moderator"]), getParents);
router.get('/getParent/:id', authMiddleware(["admin","moderator"]), getParentById);
router.put('/updateParent/:id', authMiddleware(["admin","moderator"]), updateParent);
router.delete('/deleteParent/:id', authMiddleware(["admin","moderator"]), deleteParent);

module.exports = router;
