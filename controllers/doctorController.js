const doctorModel = require("../models/doctorModel");


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


module.exports = {
    getsingledrcontroller,
    updateProfileController,
    getDoctorByIdController
}