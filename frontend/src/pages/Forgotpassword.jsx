import axios from 'axios';
import React from 'react'
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { url } from "../App";
function Forgotpassword() {
const [step, setstep] = useState(1)
const [email, setemail] = useState("")
const [otp, setotp] = useState("")
const [newpassword, setnewpassword] = useState("")
const [confirmpass, setconfirmpass] = useState("")
const primarycolor = "#ff4d2d";

  const navigate= useNavigate()


const handlesendotp=async()=>{
  try {
    
    const result= await axios.post(`${url}/api/auth/send-otp`,{
      email
    },
    {withCredentials:true}
    
  )
  console.log(result)
  setstep(2)
  } catch (error) {
    console.log("error in handlesend otp:",error.message)
  }
}


const handleverifyotp=async()=>{
  try {
    
    const result= await axios.post(`${url}/api/auth/verify-otp`,{
      email,otp
    },
    {withCredentials:true}
    
  )
  console.log(result)
  setstep(3)
  } catch (error) {
    console.log("error",error.message)
  }
}

const handleresetpassword=async()=>{

if(newpassword!==confirmpass){
  return alert("Passwords do not match");
}
  try {
     const result= await axios.post(`${url}/api/auth/reset-pass`,{
      email,newpassword
    },
    {withCredentials:true}
    
  )
  navigate("/signin")
  console.log(result)
  } catch (error) {
    console.log("error",error.message)
  }
}

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 bg-[#fff9f6]'>
      <div className=   {`bg-white rounded-xl shadow-lg w-full max-w-md p-8 `}
        >
          <div className='flex item-center gap-4 mb-4'>
<IoIosArrowRoundBack  size={30} className='text-[#ff4d2d] cursor-pointer 'onClick={()=>{navigate("/signin")}}/>
<h1 className='text-bold text-2xl text-center text-[#ff4d2d]'>forgot password</h1>
          </div>

          {step==1 && 
         
     
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            {" "}
            Email{" "}
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 bg-gray-100"
            placeholder="Enter your  email "
  
              onChange={(e)=>setemail(e.target.value)} value={email} required/>

                 <button className="w-full mt-4 flex item-center justify-center gap-2 border rounded-lg py-2 transition duration-200 hover:bg-[#e64323]"
            style={{backgroundColor:primarycolor,color:"white"}} onClick={handlesendotp}>send OTP</button>
        </div>

     
        
         }

         {step==2 && 
         
          <div className="mb-4">
          <label
            htmlFor="otp"
            className="block text-gray-700 font-medium mb-1"
          >
            {" "}
            OTP{" "}
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 bg-gray-100"
            placeholder="Enter your  otp "
  
              onChange={(e)=>setotp(e.target.value)} value={otp} required/>

                 <button className="w-full mt-4 flex item-center justify-center gap-2 border rounded-lg py-2 transition duration-200 hover:bg-[#e64323]"
            style={{backgroundColor:primarycolor,color:"white"}} onClick={handleverifyotp}>Verify OTP</button>
        </div>}
         {step==3 && 
         
          <div className="mb-4">
          <label
            htmlFor="resetpassword"
            className="block text-gray-700 font-medium mb-1"
          >
            {" "}
            Reset password{" "}
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 bg-gray-100"
            placeholder="Enter your new password "
  
              onChange={(e)=>setnewpassword(e.target.value)} value={newpassword} required/>
               <label
            htmlFor="resetpassword"
            className="block text-gray-700 font-medium mb-1"
          >
            {" "}
            Confirm password{" "}
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 bg-gray-100"
            placeholder="confirm password "
  
              onChange={(e)=>setconfirmpass(e.target.value)} value={confirmpass} required/>
              

                 <button className="w-full mt-4 flex item-center justify-center gap-2 border rounded-lg py-2 transition duration-200 hover:bg-[#e64323]"
            style={{backgroundColor:primarycolor,color:"white"}} onClick={handleresetpassword}>Reset password</button>
        </div>}
        </div>
   
    </div>
  )
}

export default Forgotpassword