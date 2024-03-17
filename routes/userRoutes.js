const express = require('express');
const router = express.Router();
const login_controller = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");


//login || post
router.post('/login', login_controller.loginController);

//Regester
router.post('/regester', login_controller.registerController);

//Auth
router.post('/getUserData',authMiddleware, login_controller.authController);

//Get-all-notofication
router.post('/get-all-notification',authMiddleware, login_controller.getallnotificationcontroller);

//Apply-Doctor
router.post('/apply-doctor',authMiddleware, login_controller.applydoctorController);

//Delete-Notifications
router.post('/delete-all-notification',authMiddleware, login_controller.deleteallnotificationController);

//GET ALL DOC || GET
router.get("/getAllDoctors",authMiddleware , login_controller.getAllDoctorsController ) ;

//BOOK APPPINTMETS
router.post('/book-appointments', authMiddleware , login_controller.bookAppointmentsController);

module.exports = router