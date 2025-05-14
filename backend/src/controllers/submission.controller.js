import { db } from "../libs/db.js";

export const getAllSubmissions = async (req, res) =>{
    try {
        const userId = req.user.id;

        const submissions = await db.submission.findMany({
            where:{
                userId: userId
            }
        })

        res.status(200).json({
            success:"true",
            message : "Submissions Retrieved Successfully",
            submissions
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: "false",
            message: "Error Retrieving Submissions",
        })
        
    }
}

export const getSubmissionByProblemId = async (req, res) =>{
    try {
        const userId = req.user.id;
        const problemId = req.params.id;
        const submission = await db.submission.findMany({
            where:{
                userId: userId,
                problemId: problemId
            }
        })
        res.status(200).json({
            success: "true",
            message: "Submission Retrieved Successfully by Id",
            submission
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: "false",
            message: "Error Retrieving Submission by Id",
        })
        
    }
}

export const getSubmissionCount = async (req, res) =>{
    try {
        
        const problemId = req.params.id;
        const count = await db.submission.count({
            where:{
                problemId
            }
        })
        res.status(200).json({
            success: "true",
            message: "Submission Count Retrieved Successfully",
            count
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: "false",
            message: "Error Retrieving Submission Count",
        })
        
    }
}