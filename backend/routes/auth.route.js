import express from "express"
import { resetpassword, sendotp, signin, signout, signup, verifyotp } from "../controller/auth.controller.js";

const authrouter= express.Router() ;

authrouter.post('/signup',signup);
authrouter.post('/signin',signin);
authrouter.post('/signout',signout);
authrouter.post('/send-otp',sendotp);
authrouter.post('/verify-otp',verifyotp);
authrouter.post('/reset-pass',resetpassword);

export default authrouter