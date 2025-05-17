import React from 'react'

const HomePage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center mt-14 rounded-2xl px-4 bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90'>
      {/* Gradient Blob */}
      <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-[#4FD1C5] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="absolute bottom-16 right-0 w-1/3 h-1/3 bg-[#F97316] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      
      {/* Main Content */}
      <div className="w-full max-w-4xl mt-20 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          Welcome to <span className="bg-gradient-to-r from-[#4FD1C5] to-[#4FD1C5]/80 bg-clip-text text-transparent">DSA2Z</span>
        </h1>
        
        <p className="mt-6 text-center text-lg font-semibold text-white/70">
          A Platform Inspired by Leetcode which helps you to prepare for coding
          interviews and helps you to improve your coding skills by solving coding
          problems
        </p>
        
        {/* Button Container */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button className="px-6 py-3 bg-gradient-to-r from-[#4FD1C5] to-[#4FD1C5]/80 text-white rounded-xl hover:shadow-lg hover:shadow-[#4FD1C5]/20 transition-all duration-300 font-medium">
            Browse Problems
          </button>
          <button className="px-6 py-3 bg-transparent border border-[#F97316]/30 text-white rounded-xl hover:bg-[#F97316]/10 hover:border-[#F97316] transition-all duration-300 font-medium">
            Learn More
          </button>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-[#4FD1C5]/5 transition-all duration-300">
            <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-[#4FD1C5]/20 to-[#4FD1C5]/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4FD1C5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white/90 mb-2">Practice Coding</h3>
            <p className="text-white/70">Enhance your skills with our curated collection of coding problems.</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-[#F97316]/5 transition-all duration-300">
            <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-[#F97316]/20 to-[#F97316]/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white/90 mb-2">Interview Prep</h3>
            <p className="text-white/70">Get ready for technical interviews with problem-solving strategies.</p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-[#4FD1C5]/5 transition-all duration-300">
            <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-[#4FD1C5]/20 to-[#4FD1C5]/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4FD1C5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white/90 mb-2">Progress Tracking</h3>
            <p className="text-white/70">Monitor your improvement with detailed performance analytics.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage