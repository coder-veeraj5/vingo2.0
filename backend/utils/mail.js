
 import nodemailer from 'nodemailer'

 const transporter= nodemailer.createTransport({
    service:"Gmail",
    port:456,
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
 })

 export const sendotp=async(to,otp)=>{
    await transporter.sendMail({
        from:process.env.EMAIL,
        to,
        subject:"reset otp",
        html:`<P>Your otp for reset password is <b>${otp}</b>.it expires in 5 minutes</p>`
    })
 }