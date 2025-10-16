import express from "express"
import { signin, signout, signup } from "../controller/auth.controller.js";

const authrouter= express.Router() ;

authrouter.post('/signup',signup);
authrouter.post('/signin',signin);
authrouter.post('/signout',signout);

export default authrouter