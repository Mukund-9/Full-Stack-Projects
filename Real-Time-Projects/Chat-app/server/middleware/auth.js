import jwt from "jsonwebtoken";
import User from "../modals/User.js";


//Middleware to protect routes
export const protectRoute=async (req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        req.user=user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.json({success:false,message:error.message});
        
    }
}