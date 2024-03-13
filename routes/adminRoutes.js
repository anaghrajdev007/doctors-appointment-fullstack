const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

//GET METHOD || USER

router.get('/getAllUsers', authMiddleware,adminController.getAllUsersController );

//GET METHOD || CHIKITSAK

router.get('/getAllDoctors', authMiddleware,adminController.getAllDoctorsController );

// POST|| CHANGE ACCOUNT STATUS
router.post('/changeAccountStatus',authMiddleware, adminController.changeAccountStatusController );



module.exports = router