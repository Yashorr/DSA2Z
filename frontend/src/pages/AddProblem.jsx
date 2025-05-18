import React from 'react'
import CreateProblemForm from '../components/CreateProblemForm'





const AddProblem = () => {
  return (
    <div>
         <div className="fixed top-16 left-0 w-1/3 h-1/3 bg-[#4FD1C5] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="fixed bottom-16 right-0 w-1/3 h-1/3 bg-[#F97316] opacity-20 blur-3xl z-[-1] rounded-md"></div>
        <CreateProblemForm />
    </div>
  )
}

export default AddProblem