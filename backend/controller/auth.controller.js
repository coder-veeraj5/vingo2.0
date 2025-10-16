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