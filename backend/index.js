

import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authrouter from "./routes/auth.route.js";
import userrouter from "./routes/user.route.js";
import cors from "cors"
dotenv.config();


const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true  // allows cookies to be sent
}))
app.use(express.json()); //convert frontend data into json
app.use(cookieParser())
app.use('/api/auth',authrouter)
app.use('/api/user',userrouter)

const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log("enter in server");
   connectDb()
})