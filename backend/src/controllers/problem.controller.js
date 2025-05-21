import { db } from "../libs/db.js"
import { getLanguageId, pollBatchResult, submitBatch } from "../libs/judge0.lib.js";

export const createProblem = async (req , res) =>{
    const { title , description ,  examples , difficulty , tags , constraints , testcases , codeSnippets , referenceSolutions } = req.body;

    if(req.user.role !== 'ADMIN'){
        return res.status(403).json({message: "You don't have permission to create a problem"})
    }

    try {
        for(const [language, code] of Object.entries(referenceSolutions)){
            const languageId = getLanguageId(language);            
            

            if(!languageId){
                return res.status(400).json({message: `Language ${language} not found`});
            }

            const submissions = testcases.map(({input,output})=>{
                return {
                    source_code:code,
                    language_id:languageId,
                    stdin : input,
                    expected_output : output
                }
            })

            const submissionResults = await submitBatch(submissions);

            const tokens = submissionResults.map((response)=>response.token);

            const results = await pollBatchResult(tokens);

            for (let i =0 ; i < results.length ; i++){
                const result = results[i];
                if(result.status.id !== 3){
                    return res.status(400).json({message: `Submission ${i+1} failed`, result})
                }
            }

            

            
            
            
            
        }
        const newProblem = await db.problem.create({
                data : {
                     title ,
                     description ,
                     examples , 
                     difficulty , 
                     tags , 
                     constraints , 
                     testcases , 
                     codeSnippets , 
                     referenceSolutions ,
                     userId: req.user.id

                }
            })
        res.status(200).json({
                success : true ,
                message: "Problem created successfully",
                newProblem
            })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error while creating problem" });
        
    }

}

export const getAllProblems = async (req , res) =>{
    try {
        const problems = await db.problem.findMany({
            include: {
                solvedBy : {
                    where : {
                        userId : req.user.id
                    }
                }
        }});

        if(!problems){
            return res.status(404).json({message: "No problems found" })
        }

        res.status(200).json({
            success : true ,
            message: "All problems fetched successfully",
            problems
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error while fetching problems" });
        
    }

}

export const getProblemById = async (req , res) =>{
    const {id}= req.params;

   

    try {
        
        
        const problem = await db.problem.findUnique({
            where: {
                id
            }
        })
        
        
        if(!problem){
            return res.status(404).json({message: "Problem not found" })
        }
        res.status(200).json({
            success : true ,
            message: "Problem fetched successfully",
            problem
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error while fetching problem by Id" });
        
    }
}

export const updateProblem = async (req , res) =>{
    
    const { title , description ,  examples , difficulty , tags , constraints , testcases , codeSnippets , referenceSolutions } = req.body;
    const {id} = req.params;

     


    if(req.user.role !== 'ADMIN'){
        return res.status(403).json({message: "You don't have permission to update a problem"})
    }

    try {
        const problem = await db.problem.findUnique({
            where: {
                id: id
            }
        })
        if(!problem){
            return res.status(404).json({message: "Problem not found to update" });
        }

         for(const [language, code] of Object.entries(referenceSolutions)){
            const languageId = getLanguageId(language);

           
            

            if(!languageId){
                return res.status(400).json({message: `Language ${language} not found`});
            }

            const submissions = testcases.map(({input,output})=>{
                return {
                    source_code:code,
                    language_id:languageId,
                    stdin : input,
                    expected_output : output
                }
            })

            const submissionResults = await submitBatch(submissions);

            const tokens = submissionResults.map((response)=>response.token);

            const results = await pollBatchResult(tokens);

            for (let i =0 ; i < results.length ; i++){
                const result = results[i];
                if(result.status.id !== 3){
                    return res.status(400).json({message: `Submission ${i+1} failed`})
                }
            }

            

            
            
            
            
        }
        const updatedProblem = await db.problem.update({
            where: {
                id: id
            },
             data : {
                     title ,
                     description ,
                     examples , 
                     difficulty , 
                     tags , 
                     constraints , 
                     testcases , 
                     codeSnippets , 
                     referenceSolutions ,
                     userId: req.user.id

                }
            })
        res.status(200).json({
                success : true ,
                message: "Problem updated successfully",
                updatedProblem
            })

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error while updating problem" });
        
    }

}

export const deleteProblem = async (req , res) =>{
    const {id} = req.params;
    try {
        const problem = await db.problem.findUnique({ where: { id: id } });
        if (!problem) {
            return res.status(404).json({ message: "Problem not found to delete" });
        }
        await db.problem.delete({ where: { id: id } });
        res.status(200).json({ success: true, message: "Problem deleted successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error while deleting problem" });
        
    }

}

export const getSolvedProblems = async (req , res) =>{
    try {
        const problems = await db.problem.findMany({
            where: {
                solvedBy : {
                    some: {
                        userId: req.user.id
                    }
                }
            },
            include: {
                solvedBy : {
                    where : {
                        userId : req.user.id
                    }
                }
            }
        })
        res.status(200).json({ 
            success: true,
            message : "Solved problems retrieved successfully",
            problems: problems });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error while retrieving solved problems" });
        
    }

}