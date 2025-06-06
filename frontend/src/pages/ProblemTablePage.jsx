import React ,{useEffect} from 'react'
import {useProblemStore} from "../store/useProblemStore"
import ProblemTable from '../components/ProblemTable';
import { Loader } from 'lucide-react';


const ProblemTablePage = () => {
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
     <div>
        <div className="fixed top-16 left-0 w-1/3 h-1/3 bg-[#4FD1C5] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="fixed bottom-16 right-0 w-1/3 h-1/3 bg-[#F97316] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      

        {
          problems.length > 0 ? <ProblemTable problems={problems}/> : (
            <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
              No problems found
            </p>
          )
        }
     </div>
  )
}

export default ProblemTablePage