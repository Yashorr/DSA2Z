import { db } from "../libs/db.js"
import { getLanguageId, submitBatch } from "../libs/judge0.lib.js";

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
                    return res.status(400).json({message: `Submission ${i+1} failed`})
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
            
            
            
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error while creating problem" });
        
    }

}

export const getAllProblems = async (req , res) =>{

}

export const getProblemById = async (req , res) =>{

}

export const updateProblem = async (req , res) =>{

}

export const deleteProblem = async (req , res) =>{

}

export const getSolvedProblems = async (req , res) =>{

}