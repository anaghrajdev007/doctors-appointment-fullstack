const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModels");



const getsingledrcontroller = async(req, res) =>{
    try{
        const doctor = await doctorModel.findOne({userId: req.body.userId});
        res.status(200).send({
            success: true,
            message:"Your Data",
            data: doctor
        });
    }
    catch(e){
        console.log(e);
        res.status(500).send({
            success: false,
            error,
            message:'Error via Controller'
        })
    }
}

const updateProfileController = async(req,res) =>{
    try{
        const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body)
        res.status(201).send({
            success: true,
            message:"Doctor's Profile Updated",
            data: doctor
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error happend while updating profile in Controller",
            err

        });
    }
}
// Get Single doctor by id
const getDoctorByIdController = async(req, res) =>{
    try{
        const doctor = await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({
            success:true,
            message:"Single doctor details fetched",
            data: doctor
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error happend while updating profile in Controller",
            error

        });
    }
}

//Get Dppointment for doctor
// Get Appointments for a Doctor
const getDoctorAppointmentsController = async(req, res) => {
    try {
        // Find the doctor's details first to get the doctor's ID.
        const doctor = await doctorModel.findOne({userId: req.body.userId});
        if (!doctor) {
            return res.status(404).send({
                success: false,
                message: "Doctor not found",
            });
        }
        // Use the doctor's ID to find related appointments.
        const appointments = await appointmentModel.find({doctorId: doctor._id});
        res.status(200).send({
            success: true,
            message: 'Doctor Appointments found successfully',
            data: appointments
        });
    } catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error happened while fetching the appointment data in Controller",
            error: error.message // It's a good practice to send back the error message for debugging.
        });
    }
};

//Update Status Controller

const updateStatusController = async(req, res) => {
    try {
        const { appointmentsId, status } = req.body;
        
        // Update the appointment's status
        const appointment = await appointmentModel.findByIdAndUpdate(appointmentsId, {status}, { new: true }).lean();
        if (!appointment) {
            return res.status(404).send({
                success: false,
                message: "Appointment not found"
            });
        }
        
        // Fetch the user associated with the appointment
        const user = await userModel.findOne({_id: appointment.userId});
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        
        // Add a new notification for the user
        user.notification.push({
            type: 'Status Updated',
            message: `Your appointment status has been updated to ${status}`,
            onclickPath: '/doctor-appointments'
        });
        
        await user.save();
        res.status(200).send({
            success: true,
            message: "Appointment Status Updated"
        });
    } catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error happened while updating the appointment status",
            error: error.message
        });
    }
};


module.exports = {
    getsingledrcontroller,
    updateProfileController,
    getDoctorByIdController,
    getDoctorAppointmentsController,
    updateStatusController
}