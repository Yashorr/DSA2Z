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
        res.status(500).json({msg : "Please login to access this resource"}) ;
        
    }
}

export const checkAdmin = async (req , res , next) =>{
    try {
        const user = req.user.id ;
        const admin = await db.user.findUnique({
            where : {
                id : user
            },
            select : {
                role : true ,
            }
        })
        
        if(!admin || admin.role !=="ADMIN"){
            return res.status(403).json({msg : "You are not authorized to get access of this resource"})
        }
        next();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({msg : "You are not authorized to get access of this"}) ;
        
    }
}