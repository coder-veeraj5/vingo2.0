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
function Signup() {
  const primarycolor = "#ff4d2d";
  const hovercolor = "#e64323";
  const bgcolor = "#fff9f6";
  const bordercolor = "#ddd";
  const [showpassword, setshowpassword] = useState(false);
  const [role, setrole] = useState("user");
  const [fullname, setfullname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [mobile, setmobile] = useState();
  const [err, seterr] = useState("")
  const [loading, setloading] = useState(false)
  const navigate= useNavigate()

  const handelsignup=async()=>{
// console.log({ fullname, email, mobile, password, role });
setloading(true)
    try {
      const result = await axios.post(`${url}/api/auth/signup`,{
        fullname,email,mobile,password,role
    }
       ,{
  withCredentials: true
}
    )
      console.log(result);
      seterr("")
      setloading(false);

    } catch (error) {
      console.log(error?.response?.data?.message)
      seterr(error?.response?.data?.message);
        setloading(false);

  }
}

const handlegoogleAuth=async ()=>{
  if(!mobile){
    return seterr("mobile no. required")
  }
  const provider=new GoogleAuthProvider();
  const result =await signInWithPopup(auth,provider);
  // console.log(result)
  try {
    const {data}=await axios.post(`${url}/api/auth/google-auth`,{
      fullname:result.user.displayName,
      email:result.user.email,
      role,
      mobile
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
          Create your account to get started with delicious food deliveries
        </p>

        <div className="mb-4">
          <label
            htmlFor="fullname"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name{" "}

            
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
            placeholder="Enter your Full Name "
            style={{ border: ` 1px solid ${bordercolor}` }}
              onChange={(e)=>setfullname(e.target.value)} value={fullname} required/>
        </div>
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
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile no.{" "}
          </label>
          <input
            type="mobile"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 "
            placeholder="Enter your mobile no. "
            style={{ border: ` 1px solid ${bordercolor}` }}
             onChange={(e)=>setmobile(e.target.value)} value={mobile} required/>
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
                onChange={(e)=>setpassword(e.target.value)} value={password} required/>
            <button
              className="absolute curser-pointer right-3 top-[15px]"
              onClick={() => setshowpassword((e) => !e)}
            >
              {!showpassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

          <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2 ">
            {["user","owner","fooddelivery"].map((r)=>(
              <button className="  flex-1 border rounded-lg px-3 py-2 text-center font-medium cursor-pointer transition-color"
              onClick={()=>setrole(r)}
              style={
                 role==r?{backgroundColor:primarycolor,color:"white"}:{border: `1px solid ${primarycolor}`,color:primarycolor }

              }>{r}</button>
            ))

          }

            
           
          </div>
        </div>

        <button className="w-full mt-4 flex item-center justify-center gap-2 border rounded-lg py-2 transition duration-200 hover:bg-[#e64323]"
        style={{backgroundColor:primarycolor,color:"white"}} onClick={()=>{handelsignup()}}>
         {loading? <ClipLoader size={20} color="white"/>:"signup"}</button>
{err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
        
        
         <button className="w-full mt-4 flex item-center justify-center gap-2 border rounded-lg py-2 transition duration-200 hover:bg-[#e64323] border-gray-400 hover:bg-gray-200"
         onClick={handlegoogleAuth} >
         <FcGoogle size={20} /> <span>sigup with google</span></button>

      <p className="text-center mt-2 cursor-pointer "> Already have an account?    <Link to ="/signin" className="text-[#ff4d2d] hover:underline">signin</Link> </p>
      </div>
    </div>
   );
}
// onClick={()=>{navigate("/signin")}} for pagination signup page to signin page (also use <link to ="/signin"><link> )


export default Signup;
