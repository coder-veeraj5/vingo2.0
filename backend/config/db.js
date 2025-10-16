import mongoose from "mongoose"

 
 const connectDb=async ()=>{
try {
    await mongoose.connect(process.env.MONGO_DB)
    console.log("DB CONNECTED");
    
    
} catch (error) {
    console.error(" MongoDB connection error:", error.message);
}
 }
export default connectDb