const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const doctorController = require("../controllers/doctorController");
//Single Doc info

router.post('/getDoctorInfo', authMiddleware , doctorController.getsingledrcontroller)

// POST || UPDATE PROFILE
router.post('/updateProfile',authMiddleware , doctorController.updateProfileController )

module.exports = router