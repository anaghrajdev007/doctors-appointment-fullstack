const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");



const getAllUsersController = async(req, res) => {
    try{
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message:'User List for all user',
            data:users
        })
    }
    catch(error){
        console.log(error);
        res.status(404).send({
            success: false,
            message:'Error while getting users',
            error
        });
    }
}

const getAllDoctorsController = async(req,res) => {
    try{
        const doctors = await doctorModel.find({})
        res.status(200).send({
            success: true,
            message:'User List for all user',
            data:doctors
        })
    }
    catch(error){
        console.log(error);
        res.status(404).send({
            success: false,
            message:'Error while getting users',
            error
        });
    }
}

//Change Account Status

const changeAccountStatusController = async(req, res) =>{
    try{
        const {doctorId, status}= req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status})
        const user = await userModel.findOne({_id: doctor.userId})
        const notification = user.notification
        notification.push({
            type:'doctor-account-request-updated',
            message:`Your Doctor Account Request Has Been ${status}`,
            onClickPath:'/notification'
        })

        user.isDoctor === 'approved' ?true : false
        await user.save()
        res.status(200).send({
            success: true,
            message:'Account Status Updated Successfully',
            data: doctor
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message:'Error while changing account status',
            err
        })
    }
}

module.exports = {
    getAllUsersController,
    getAllDoctorsController,
    changeAccountStatusController
}