import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useActions = create((set)=>({
    isDeletingProblem:false,
    isUpdatingProblem :false,


    onDeleteProblem:async(id)=>{
        try {
             set({ isDeletingProblem: true });
            const res = await axiosInstance.delete(`/problems/delete-problem/${id}`);
            toast.success(res.data.message);
        } catch (error) {
             console.log("Error deleting problem", error);
            toast.error("Error deleting problem");
        }
        finally{
            set({isDeletingProblem:false})
        }
    },

    onEditProblem :async(title , description ,  examples , difficulty , tags , constraints , testcases , codeSnippets , referenceSolutions ,id)=>{
        try {
            set({ isUpdatingProblem: true });
            const res = await axiosInstance.put(`/problems/update-problem/${id}`, {title , description ,  examples , difficulty , tags , constraints , testcases , codeSnippets , referenceSolutions})
            toast.success(res.data.message);
            
        } catch (error) {
            console.log("Error updating problem", error);
            toast.error("Error updating problem");
            
        }finally{
            set({isUpdatingProblem:false})
        }
    }
}))