const express = require('express');
const { userLogin } = require("../controllers/loginController.js");
const { addUser, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController.js");
const authMiddleware = require("../middleware/auth.js");

const router = express.Router();

router.post('/login', userLogin);
router.post("/addUser", authMiddleware(["admin"]), addUser);
router.get("/getUser", authMiddleware(["admin"]), getUsers);
router.get("/getUser/:id", authMiddleware(["admin"]), getUserById);
router.put("/updateUser/:id", authMiddleware(["admin"]), updateUser);
router.delete("/deleteUser/:id", authMiddleware(["admin"]), deleteUser);

module.exports = router;
