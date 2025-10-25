 import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
 const isauth = async(req,res,next)=>{
try {
    const token=req.cookies.token;
if(!token){
  return  res.status(400).json({message:"token not found"})
}

const decoded=  jwt.verify(token,process.env.JWT_SECRET_KEY);
if(!decoded){
   return  res.status(400).json({message:"user not found"})
}
console.log(decoded)
req.userId=decoded.userId
next();
} catch (error) {
       console.error("Auth error:", error.message);
   return res.status(401).json({ message: "Token is not valid" });
}

 };
 export {isauth};