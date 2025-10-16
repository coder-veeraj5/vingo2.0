import mongoose from "mongoose";

 

 const userschema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true,

    },
      email:{
        type:String,
        required:true,
   unique:true
    } ,
    password:{
          type:String
    },
    mobile :{
         type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","owner","fooddelivery"],
        required:true,
    },
    resetotp:{
        type:String
    }, 
     isotpverified:{
        type:Boolean,
        default:false
    },
    otpexpire:{
        type:Date
    }


 },{timestamps:true})

 const User=mongoose.model("User",userschema);

 export default User