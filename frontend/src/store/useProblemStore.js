import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useProblemStore = create((set) => ({
    problems: [],
    problem: null,
    solvedProblems : [],
    isProblemLoading : false,
    isProblemsLoading : false,
    isProblemSolved : false,

    getAllProblem : async () => {
        try {
            set({isProblemsLoading : true});
            const response = await axiosInstance.get('/problems/get-all-problems');
            set({problems: response.data.problems});

            
            
            
        } catch (error) {
            console.log(error);
            toast.error ('Failed to load problems');

            
        }finally{
            set({isProblemsLoading : false});
        }

    },

    getProblemById : async (id) =>{
        try {
            set({isProblemLoading : true});
            const response = await axiosInstance.get(`/problems/get-problem/${id}`);
            set({problem: response.data.problem});


            
        } catch (error) {
             console.log(error);
            toast.error ('Failed to load problem');

            
        }finally {
            set({isProblemLoading : false});
        }

    }, 

    getSolvedProblems : async () => {
        try {
            set({isProblemSolved: true});
            const response = await axiosInstance.get('/problems/get-solved-problems');
            set({solvedProblems : response.data.problems});
            
        } catch (error) {
            console.log(error);
            toast.error ('Failed to load solved problems');
            
        }finally{
             set({isProblemSolved: false});
        }

    },

    
}))