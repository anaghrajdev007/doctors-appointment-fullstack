const { response } = require('express');
const userModel = require('../models/userModels');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require("../models/doctorModel");
const appointmentModel = require('../models/appointmentModel');
const moment = require('moment');




const registerController = async(req,res) =>{
    try{
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({success:false, message:'User already registered'})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password, salt)
        req.body.password = hasedPassword
        const newuser = new userModel(req.body)
        await newuser.save();
        res.status(201).send({message:"User Regestered Successfully", success: true})
    } catch (error){
        res.status(500).send({success: false,message:`Regester controller ${error.message}`})
    }
};

//Login Handler
const loginController = async(req,res) =>{
   try{
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:'User Not Found', success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(200).send({message:'Invalid Email or Password', success:false})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.status(200).send({message: 'Login successful', success:true, token})
   } catch (error){
    res.status(500).send({success: false,message:`Login controller ${error.message}`})
   } 
}

//Authorization Controller
const authController = async(req, res) => {
    try {
        const user = await userModel.findById({_id: req.body.userId});
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: 'User not found',
                success: false
            });
        } else {
            res.status(200).send({
                success: true,
                data: user
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({success: false, message: 'Auth Error', e});
    }
};

//Apply Doctor
const applydoctorController = async(req,res) =>{
    try{
        const newDoctor = await doctorModel({...req.body, status:'pending'})
        await newDoctor.save();
        const adminUser = await userModel.findOne({isAdmin:true})
        const notification = adminUser.notification
        notification.push({
            type:'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for Doctor's account approval`,
            data:{
                doctorId: newDoctor._id,
                name: newDoctor.firstName+ " " + newDoctor.lastName,
                onclickPath: '/admin/doctor'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id,{notification})
        res.status(201).send({
            sucess:true,
            message:'Applied successfully'
        })
    } catch(e){
        console.log(e);
        res.status(500).send({success: false, message: e});
    }
};

const getallnotificationcontroller = async(req,res)=>{
    try{
        const user = await userModel.findOne({_id:req.body.userId})
        const seennotification = user.seennotification;
        const notification = user.notification;
        seennotification.push(...notification)
        user.notification = []
        user.seennotification = notification
        const updateUser = await user.save()
        res.status(200).send({
            success:true,
            message:'all notication marked read',
            data:updateUser
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({success: false, message:'Error in notification controller'});
    }
};


const deleteallnotificationController = async(req,res) =>{
    try{
        const user = await userModel.findOne({_id: req.body.userId})
        user.notification =[]
        user.seennotification =[]
        const updateUser = await user.save()
        updateUser.password = undefined
        res.status(200).send({
            success: true,
            message: 'Notification has been deleted successfully',
            data: updateUser,
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send({success: false, message:'Error in notification',err});
    }
};
// Get all Doctors
const getAllDoctorsController = async(req,res) =>{
    try{
        const doctors = await doctorModel.find({status : 'approved'})
        res.status(200).send({
            success : true,
            message: "Doctor's List",
            data: doctors
        });
    }
    catch(err){
        console.error(err);
        res.status(500).send({success: false, message:'Error in controller',err});
    }
}

//BOOK APPOINTMENTS
const bookAppointmentsController = async(req, res) =>{
    try{
        req.body.date = moment (req.body.date, 'DD-MM-YYYY').toISOString();
        req.body.time = moment (req.body.time, 'HH:mm').toISOString();
        req.body.status = 'pending';
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save();
        const user = await userModel.findOne({_id: req.body.doctorInfo.userId})
        user.notification.push({
            type:'New-Appointment-request',
            message:`A new Appointment Request from ${req.body.userInfo.name}`,
            onclickPath:'/user/appointments'
        })
        await user.save();
        res.status(200).send({
            success : true,
            message: "Appointment Booked Successfully"
           
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({success: false, message:'Error in controller',err});
    }
}

//Booking Availablity Controller
const bookingAvailablityController = async (req, res) => {
    try {
        // Assuming dates are provided in DD-MM-YYYY format and times in HH:mm format.
        // Convert to ISO string considering the time zone, here assuming UTC for simplicity.
        const date = moment(req.body.date, 'DD-MM-YYYY').utc().startOf('day').toISOString();
        const fromTime = moment.utc(`${req.body.date} ${req.body.time}`, 'DD-MM-YYYY HH:mm').subtract(1, 'hours').toISOString();
        const toTime = moment.utc(`${req.body.date} ${req.body.time}`, 'DD-MM-YYYY HH:mm').add(1, 'hours').toISOString();
        const doctorId = req.body.doctorId;

        // Find appointments within the time range for the specified doctor and date
        const appointments = await appointmentModel.find({
            doctorId,
            date,
            time: {
                $gte: fromTime,
                $lte: toTime
            }
        });

        if (appointments.length > 0) {
            return res.status(200).send({
                message: 'Appointments not available at this time',
                availability: false,
                success: true // Indicates that the operation (checking availability) was successful
            });
        } else {
            return res.status(200).send({
                message: 'Appointments available',
                availability: true,
                success: true
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in booking availability controller',
            error: err.message
        });
    }
};

//Appointment List Controller

const appointmentListController = async(req, res) => {
    try{
        const appointment = await appointmentModel.find({userId: req.body.userId})
        res.status(200).send({
            success:true,
            message:"Appointments found successfully",
            data: appointment
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in booking availability controller',
            error: err.message
        });
    }
}


module.exports = {
    loginController,
    registerController,
    authController,
    applydoctorController,
    getallnotificationcontroller,
    deleteallnotificationController,
    getAllDoctorsController,
    bookAppointmentsController,
    bookingAvailablityController,
    appointmentListController
}