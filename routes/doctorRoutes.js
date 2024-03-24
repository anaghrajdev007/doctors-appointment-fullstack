const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const doctorController = require("../controllers/doctorController");
//Single Doc info

router.post('/getDoctorInfo', authMiddleware , doctorController.getsingledrcontroller)

// POST || UPDATE PROFILE
router.post('/updateProfile',authMiddleware , doctorController.updateProfileController )

//POST || GET SINGLE DOCTOR INFO
router.post('/getDoctorById', authMiddleware , doctorController.getDoctorByIdController)

//Get Appointments || GET
router.get('/doctor-appointments', authMiddleware , doctorController.getDoctorAppointmentsController)

// POST || UPdate Status
router.post('/update-status', authMiddleware , doctorController.updateStatusController)

module.exports = router