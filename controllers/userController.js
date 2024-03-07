const { response } = require('express');
const userModel = require('../models/userModels');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');




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



module.exports = {
    loginController,
    registerController,
    authController
}