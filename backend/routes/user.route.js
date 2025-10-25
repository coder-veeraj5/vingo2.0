import express from "express"

import { getcurrentuser } from "../controller/user.controller.js";
import { isauth } from "../middleware/isauth.js";

const userrouter= express.Router() ;


userrouter.get('/currentuser',isauth,getcurrentuser);





export default userrouter