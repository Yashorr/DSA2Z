import jwt from "jsonwebtoken"
import { db } from "../libs/db.js";

export const authMiddleware = async (req , res , next) =>{
    try {
        const token = req.cookies.jwt || req.header("Authorization").replace("Bearer ", "");
        if(!token){
            return res.status(401).json({msg : "Please login to access this resource"}) ;
        }
        const verify = jwt.verify(token , process.env.JWT_SECRET) ;

        if(!verify){
            return res.status(401).json({msg : "Invalid token"}) ;
        }
        
        const user = await db.user.findUnique({
            where : {
                id : verify.id
            } ,
            select : {
                id : true ,
                name : true ,
                email : true ,
                role : true ,
            }
        }) ;
        
        if(!user){
            return res.status(401).json({msg : "User not found"}) ;
        }

        req.user=user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({msg : "Internal server error while verifying token"}) ;
        
    }
}