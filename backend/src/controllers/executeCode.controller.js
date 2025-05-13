import { pollBatchResult, submitBatch } from "../libs/judge0.lib.js";

export const executeCode = async(req,res) =>{
    try {
        const {source_code, language_id ,stdin , expected_outputs , problemId} = req.body;
        
        const id = req.user.id;

        if(!Array.isArray(stdin) || !Array.isArray(expected_outputs) || stdin.length !== expected_outputs.length || stdin.length === 0){
            return res.status(400).json({error: "Invalid test cases or missing test cases" });
        }

        const submissions = stdin.map((input)=>({
           
                source_code,
                language_id ,
                stdin:input,
                
        }))
        
        

        const submitResponse = await submitBatch(submissions);
        

        const token = submitResponse.map((res)=>res.token);
        console.log(token);

        const result = await pollBatchResult(token);

        console.log(result);

        res.status(200).json({
            success: true,
            message : "Code executed successfully",
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error While executing code",
        })
    }
}