import { json } from "express";
import User from '../models/user.model.js';

import bcrypt from 'bcryptjs';
import gentoken from "../utils/jwt.js";

 export const signup= async(req,res)=>{
try {
    
    const {fullname,email,password,mobile,role}=req.body
    const existingUser =await User.findOne({ email });

    if (existingUser ) {
        return res.status(400).json({message:"email already exists"});

    }
    
    if (password.length<6) {
        return res.status(400).json({message:"password must be greater 6 letters"});

    }
        
    if (mobile.length<10) {
        return res.status(400).json({message:"moibile no  must be  10 numbers"});

    }

    const hashedpassword=await bcrypt.hash(password,10);

 const    user=await User.create({
        fullname,
        email,
        password:hashedpassword,
        mobile,
        role
    })

    const token= await gentoken(user._id);
    res.cookie('token',token,{
sameSite:"strict",
httpOnly:true,
maxAge:1*24*60*60*1000,

    })

 return res.status(200).json(user);

} catch (error) {
   return res.status(500).json({message:"sign in error " + error.message});

    
}


}
 export const signin= async(req,res)=>{
try {
    
    const {email,password}=req.body
    const user =await User.findOne({email});

    if (!user ) {
        return res.status(400).json({message:"email does not exists"});

    }

    const isMatch=await bcrypt.compare(password,user.password)
    
    if (!isMatch) {
          return res.status(400).json({message:"paswordd in-correct"});
    }
 



    const token= await gentoken(user._id);
    res.cookie('token',token,{
sameSite:"strict",
httpOnly:true,
maxAge:1*24*60*60*1000,

    })

 return res.status(200).json(user);

} catch (error) {
   return res.status(500).json({message:"sign up error " + error.message});

    
}


}

export const signout=async(req,res)=>{

    try {
        res.clearCookie('token');
    } catch (error) {
         return res.status(500).json({message:"sign out error " + error.message});
    }
}

export const  sendotp=async(req,res)=>{
    try {
        
        const {email}=req.body;
        const user= await User.findOne(email);
        if(!user){
             return res.status(400).json({message:"email not exists"});
        }

        const otp=Math.floor(1000+ Math.random() * 9000).toString();
        user.resetotp=otp;
        user.isotpverified=false;
        user.otpexpire=Date.now()+5*60*1000;
        await user.save()

        await sendotpmail(email,otp);

         return res.status(200).json({message:"otp send successfully",otp});
    } catch (error) {
        return res.status(500).json({ error});
    }
}

export const verifyotp=async(req,res)=>{
    try {
        const {email,otp}=req.body;
        const user= await User.findOne(email);
        if(!user || resetotp!=otp || otpexpire<Date.now()){
                return res.status(400).json({message:"invalid or otp expires"});
        }
        user.resetotp=undefined;
        user.otpexpire=undefined;
        user.verifyotp=true;
 
        await user.save();
        
         return res.status(200).json({message:"otp verify successfully"});
    } catch (error) {
              return res.status(500).json( `otp verify error ${error}`);
    }
}

export const resetpassword=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user= await User.findOne(email);
        if(!user || verifyotp!=true){
               return res.status(400).json({message:"otp verification required"});
        }
const hashedpassword= await bcrypt.hash(password,10);
user.password=hashedpassword;
user.verifyotp=false;
 
await user.save();
 return res.status(200).json({message:"password reset  successfully"});


    } catch (error) {
         return res.status(500).json( `otp verify error ${error}`);
    }
}