
import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { url } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
function Signin() {
  const primarycolor = "#ff4d2d";
  const hovercolor = "#e64323";
  const bgcolor = "#fff9f6";
  const bordercolor = "#ddd";
  const [showpassword, setshowpassword] = useState(false);
 const [err, seterr] = useState("")
   const [loading, setloading] = useState(false)
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const navigate= useNavigate()

  const handelsignin=async()=>{
// console.log({ fullname, email, mobile, password, role });
setloading(true)
    try {
      const result = await axios.post(`${url}/api/auth/signin`,{
      email,password
    }
       ,{
  withCredentials: true
}
    )
      console.log(result)
      seterr("");
setloading(false)
    } catch (error) {
     seterr(error?.response?.data?.message);
setloading(false)
  }
 

}
 const handlegoogleAuth=async ()=>{
  
  const provider=new GoogleAuthProvider();

  const result =await signInWithPopup(auth,provider);
  // console.log(result)
  try {
    const {data}=await axios.post(`${url}/api/auth/google-auth`,{
   
      email:result.user.email,
     
    },{withCredentials:true})
    console.log(data);

  } catch (error) {
    console.log(error)
  }
}
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgcolor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`}
        style={{ border: `1px solid ${bordercolor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primarycolor }}
        >
          Vingo
        </h1>
        <p className="text-gray-600 mb-8">
          Signin to  your account to get started with delicious food deliveries
        </p>

     
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
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
            placeholder="Enter your  email "
            style={{ border: ` 1px solid ${bordercolor}` }}
              onChange={(e)=>setemail(e.target.value)} value={email} required/>
        </div>
    
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password{" "}
          </label>
          <div className="relative">
            <input
              type={`${showpassword ? "text" : "password"}`}
              className="  w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
              placeholder="Enter your Password "
               style={{ border: ` 1px solid ${bordercolor}` }}
                onChange={(e)=>setpassword(e.target.value)} value={password} required />
            <button
              className="absolute curser-pointer right-3 top-[15px]"
              onClick={() => setshowpassword((e) => !e)}
            >
              {!showpassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <div className="text-right mb-4 text-[#ff4d2d] font-mediunm" onClick={()=>{navigate("/forgot-password")}}>forgot password</div>

          

        <button className="w-full mt-4 flex item-center justify-center gap-2 border rounded-lg py-2 transition duration-200 hover:bg-[#e64323]"
        style={{backgroundColor:primarycolor,color:"white"}} onClick={()=>{handelsignin()}}>
           {loading? <ClipLoader size={20} color="white"/>:"signin"} </button>
        {err && 
        <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
        
         <button className="w-full mt-4 flex item-center justify-center gap-2 border rounded-lg py-2 transition duration-200 hover:bg-[#e64323] border-gray-400 hover:bg-gray-200"
      onClick={handlegoogleAuth}><FcGoogle size={20} /> <span>signin with google</span></button>

      <p className="text-center mt-2 cursor-pointer "> want to Create new account ? Signup    <Link to ="/signup" className="text-[#ff4d2d] hover:underline">signup</Link> </p>
      </div>
    </div>
   );
}
// onClick={()=>{navigate("/signin")}} for pagination signup page to signin page (also use <link to ="/signin"><link> )


export default Signin;
