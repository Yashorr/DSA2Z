import { getLanguageName, pollBatchResult, submitBatch } from "../libs/judge0.lib.js";
import { db } from "../libs/db.js"

export const executeCode = async(req,res) =>{
    try {
        const {source_code, language_id ,stdin , expected_outputs , problemId} = req.body;
        
        const userId = req.user.id;

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
        

        const result = await pollBatchResult(token);

        const allPasses = true ; 

        const refinedResults= result.map((respo, index)=>{
            const stdout=respo.stdout?.trim();
            const expectedOutput=expected_outputs[index]?.trim();
            const pass = stdout === expectedOutput;

            if(!pass){
                allPasses=false;
            }

            return {
                testCase : index + 1,
                pass , 
                stdout,
                expected : expectedOutput,
                stderr : respo.stderr || null , 
                compile_output : respo.compile_output || null ,
                status : respo.status.description ,
                memory : respo.memory ? `${respo.memory}KB` : null ,
                time : respo.time ? `${respo.time} s` : null ,
            }
        })

        const submission = await db.submission.create({
            data:{
                userId ,
                problemId,
                sourceCode : source_code ,
                language : getLanguageName(language_id),
                stdin : stdin.join("\n"),
                stdout : JSON.stringify(refinedResults.map((r)=>r.stdout)),
                stderr : refinedResults.some((r)=>r.stderr) ? JSON.stringify(refinedResults.map(()=> r.stderr)) : null,
                compileOutput : refinedResults.some((r)=>r.compile_output) ? JSON.stringify(refinedResults.map((r)=>r.compile_output)) : null ,
                status : allPasses ? "Accepted" : "Wrong Answer",
                memory : refinedResults.some((r)=>r.memory) ? JSON.stringify(refinedResults.map((r)=> r.memory ) ) : null ,
                time : refinedResults.some((r)=>r.time ) ? JSON.stringify(refinedResults.map((r)=>r.time) ) : null ,

            }
        })

        if(allPasses){
            await db.problemSolved.upsert({
                where: {
                    userId_problemId: {
                        userId , problemId
                    }
                },
                update : {

                },
                create:{
                    userId , problemId 
                }
            })
        }

        const testCaseResults = refinedResults.map((map)=>({
            submissionId : submission.id ,
            testCase : map.testCase ,
            passed : map.pass ,
            stdout : map.stdout ,
            stderr : map.stderr ,
            expected : map.expected ,
            compileOutput : map.compile_output ,
            memory : map.memory ,
            status : map.status ,
            time : map.time ,
        }))

        await db.testCaseResult.createMany({
            data: testCaseResults
        })

        const submissionWithTestCase = await db.submission.findUnique({
            where: {
                id: submission.id
            },
            include: {
                testCases: true
            }
        })



        res.status(200).json({
            success: true,
            message : "Code executed successfully",
            submission : submissionWithTestCase ,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error While executing code",
        })
    }
}