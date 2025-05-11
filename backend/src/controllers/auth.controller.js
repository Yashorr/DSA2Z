import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

export const register= async (req , res )=>{
    const {email , name , password} = req.body;
    try {
        const existingUser = await db.user.findUnique({
            where:{
                email
            }
        })
        if(existingUser) {
            return res.status(400).json({
                error : "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await db.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                role : UserRole.USER
            }
        })

        const token = jwt.sign({id:newUser.id},process.env.JWT_SECRET,{
            expiresIn : "7d" 
        })

        res.cookie("jwt", token,{
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV !== "development",
            maxAge : 1000*60*60*24*7

        })

        res.status(201).json({
            success: "true",
            message: "User created successfully",
            user : {
                id:newUser.id,
                name:newUser.name,
                email : newUser.email,
                role : newUser.role
            }
            
        })

        
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error:"Error creating user"
        })
        
    }
}
export const login= async (req , res )=>{
    const {email , password} = req.body;
    try {
        const user = await db.user.findUnique({
                where: {
                        email
                    },
            })
        if(!user){
            return res.status(401).json({
                error: "User not found"
            })
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return res.status(401).json({
                error: "Invalid credintials"
            })
        }
        const token = jwt.sign({id:user.id },process.env.JWT_SECRET,{
            expiresIn : "7d"
        })

        res.cookie("jwt", token,{
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV !== "development",
            maxAge : 1000*60*60*24*7

        })

        res.status(200).json({
            success: "true",
            message: "User logged in successfully",
            user : {
                id:user.id,
                name:user.name,
                email : user.email,
                role : user.role
            }
            
        })


    } catch (error) {
        console.error("Error signing in user:", error);
        res.status(500).json({
            error:"Error signing in user"
        })

        
    }
}
export const logout= async (req , res )=>{
    try {
        res.clearCookie("jwt",{
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV !== "development",
            

        })
        res.status(200).json({
            success: "true",
            message: "User logged out successfully",
        })
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({
            error: "Error logging out user"
        })
        
    }
}
export const getMe= async (req , res )=>{
    try {
        res.status(200).json({
            success: "true",
            message: "User data retrieved successfully",
            user : req.user
        })
        
    } catch (error) {
        console.error("Error retrieving user data:", error);
        res.status(500).json({
            error: "Error retrieving user data"

        })
        
    }
}