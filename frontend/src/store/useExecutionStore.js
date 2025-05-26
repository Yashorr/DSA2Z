import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { runCode } from '../../../backend/src/controllers/executeCode.controller';

export const useExecutionStore = create((set) =>({
    isExecuting : false,
    submission : null ,
    isRunning : false ,
    runResult : null ,

    executeCode : async (source_code,language_id,stdin,expected_outputs,problemId) =>{
         
        try {
            set({isExecuting : true})
          
            
            const response = await axiosInstance.post('/execute-code/',{source_code,language_id,stdin,expected_outputs,problemId});
            set({submission: response.data.submission});
            toast.success('Code executed successfully');
            
        } catch (error) {
            console.error(error);
            toast.error('Failed to execute code');
            
        }finally{
            set({isExecuting : false});
        }
    },

    runCode : async (source_code,language_id,stdin,expected_outputs,problemId) =>{
        try {
            set({isRunning : true})
          
            
            const response = await axiosInstance.post('/execute-code/run',{source_code,language_id,stdin,expected_outputs,problemId});
            set({runResult: response.data.submission});
            toast.success('Run Result Is Out');
            
        } catch (error) {
            console.error(error);
            toast.error('Failed to Run code');
            
        }finally{
            set({isRunning : false});
        }


    },

    clearRun : async () =>{
        try {
            set({runResult : null});
        } catch (error) {
            console.log("Error in clearing submission " ,error);

        }

    },

    clearSubmission : async () =>{
        try {
            set({submission : null});
        } catch (error) {
            console.log("Error in clearing submission " ,error);

        }

    },

}))