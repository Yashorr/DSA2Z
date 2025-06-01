import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAI = create((set) =>({
    isAiDataLoading : false,
    aiData : null ,

    analyzeCode : async (source_code, description) =>{
        try {
            set({isAiDataLoading : true});
            const response = await axiosInstance.post('/ai-analyze/', {source_code , description});
            const data = response.data;
            set({aiData : data });

            toast.success ('Code Analysis Completed');
            
        } catch (error) {
            console.error(error);
            toast.error('Error occurred while analyzing code');
            
        }finally{
            set({isAiDataLoading : false});
        }
    },

    refreshAnalysis : async () =>{
        try {
            set({aiData : null});
            
        } catch (error) {
            console.error(error);

            
        }
    }

}))