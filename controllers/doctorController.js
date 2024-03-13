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


module.exports = {
    getsingledrcontroller
}