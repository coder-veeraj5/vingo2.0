 
import jwt from 'jsonwebtoken';

 const gentoken= (userId)=>{

try {
    const token =  jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})

return token
} catch (error) {
    
    console.log(error);
    
}
 }

 export default gentoken