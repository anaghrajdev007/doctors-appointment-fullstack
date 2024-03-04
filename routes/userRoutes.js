const express = require('express');
const router = express.Router();
const login_controller = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");


//login || post
router.post('/login', login_controller.loginController);

//Regester
router.post('/regester', login_controller.registerController);

//Auth
router.post('/getUserDatah',authMiddleware, login_controller.authController);

module.exports = router