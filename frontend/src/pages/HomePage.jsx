import React,{useEffect} from 'react'
import {useProblemStore} from "../store/useProblemStore"
import { Loader } from 'lucide-react'
import ProblemTable from '../components/ProblemTable';


const HomePage = () => {
  const {getAllProblem, problems,isProblemsLoading  } = useProblemStore();

  useEffect(()=>{
    getAllProblem();
  },[getAllProblem]);

  if(isProblemsLoading){
    return (
      <div className='flex items-center justify-center h-screen'> 
        <Loader className=' size-10 animate-spin' />
      </div>
    )
  }
  return (
    <div className='min-h-screen flex flex-col items-center mt-14 rounded-2xl px-4 bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90'>
      {/* Gradient Blob */}
      <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-[#4FD1C5] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="absolute bottom-16 right-0 w-1/3 h-1/3 bg-[#F97316] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      
      {/* Main Content */}
      <div className="w-full max-w-5xl mt-20 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          Welcome to <span className="bg-gradient-to-r from-[#4FD1C5] to-[#4FD1C5]/80 bg-clip-text text-transparent">DSA2Z</span>
        </h1>
        
        <p className="mt-6 text-center text-lg font-semibold text-white/70">
          A Platform Inspired by Leetcode which helps you to prepare for coding
          interviews and helps you to improve your coding skills by solving coding
          problems
        </p>
        

        {
          problems.length > 0 ?<ProblemTable problems={problems}/> : (
            <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
              No problems found
            </p>
          )
        }
        
        {/* Button Container */}
        
        
        {/* Feature Cards */}
        
      </div>
    </div>
  )
}

export default HomePage