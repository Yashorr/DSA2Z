
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore'


const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const {authUser} = useAuthStore()
  

  const categories = [
    { id: "all", name: "All Problems" },
    { id: "arrays", name: "Arrays & Hashing" },
    { id : "hash-table" , name : "Hash Table" },
    { id: "dp", name: "Dynamic Programming" },
    { id: "graphs", name: "Graphs" },
    { id: "trees", name: "Trees" },
  ];

  const featuredProblems = [
    { 
      id: "041fa3dd-a1cc-481c-8a43-e568c091e84d", 
      title: "Two Sum", 
      difficulty: "easy", 
      category: "arrays",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
    },
    { 
      id: "e5775300-40fe-4e48-9e3c-84d6b6b2be0e", 
      title: "Longest Palindromic Substring", 
      difficulty: "medium", 
      category: "dp",
      description: "Given a string s, return the longest palindromic substring in s."
    },
    { 
      id: "aa0cf884-6377-4b0a-9130-a5e0d5796695", 
      title: "Word Ladder", 
      difficulty: "hard", 
      category: "hash-table",
      description: "Find the shortest sequence of one-letter transformations from beginWord to endWord using words from wordList, where adjacent words differ by exactly one character"
    },
    { 
      id: "30dda26e-eb89-4a6d-a4ba-c4da0167c22d", 
      title: "Number of Islands", 
      difficulty: "medium", 
      category: "graphs",
      description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands."
    },
  ];

  const filteredProblems = selectedCategory === "all" 
    ? featuredProblems 
    : featuredProblems.filter(problem => problem.category === selectedCategory);

  const stats = [
    { label: "Problems", value: "50+" },
    { label: "Topics", value: "20+" },
    { label: "Difficulty Levels", value: "3" },
    { label: "languages" , value: "3" },
  ];

  return (
     <div className='w-full px-20 py-5'>
         
    <div className="min-h-screen    text-white overflow-hidden relative">
      {/* Gradient Blobs */}
      <div className="fixed top-16 left-0 w-1/3 h-1/3 bg-[#4FD1C5] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="fixed bottom-16 right-0 w-1/3 h-1/3 bg-[#F97316] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      
     
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center gap-3 transition-transform scale-200 pl-5 hover:scale-205 duration-200">
          <img src="/logo.png" alt="DSA2Z Logo" className="w-25 h-10" />
        </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link to="/problem" className="hover:text-[#4FD1C5] transition">
                  
            <span>Problems</span>
          </Link>
          <Link to="/profile" className="hover:text-[#4FD1C5] transition">
                  
            <span>My Profile</span>
          </Link>
          <Link to="/pricing" className="hover:text-[#4FD1C5] transition">
                  
            <span>Pricing</span>
          </Link>
         {
          authUser?.role === "ADMIN" && (
            <Link to="/add-problem" className="hover:text-[#4FD1C5] transition">
                  
            <span>Add Problem</span>
          </Link>
          )
         }
        </div>

        <div className='w-[10%]'>

        </div>
       
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master <span className="text-[#4FD1C5]">Data Structures</span> & <span className="text-[#F97316]">Algorithms</span> 
            <br /> with AI-Powered Insights
          </h1>
          <p className="text-xl text-gray-300 mb-8">
          Solve curated problems and get real-time AI feedback to improve code quality, efficiency, and logic.<br/>

          <span className="text-2xl font-bold text-gray-100 bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent mb-2">3 free tokens on signup </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/problem" className="bg-gradient-to-r from-[#4FD1C5] via-gray to-[#F97316] px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition flex items-center justify-center">
              Start Practicing <ArrowRight className="ml-2 h-5 w-5" />
              
            </Link>
            
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className=" py-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Problems Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-8">Featured Problems</h2>
        
        {/* Category Tabs */}
        <div className="mb-8 flex items-center space-x-4 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-[#4FD1C5] to-[#F97316] text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Problems List */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProblems.map(problem => (
            <div 
              key={problem.id} 
              className="bg-gray-800 rounded-lg p-6 hover:border-[#4FD1C5] border border-gray-700 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg">{problem.title}</h3>
                <div className={`difficulty-${problem.difficulty}`}>
                  {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                </div>
              </div>
              <p className="text-gray-400 mb-4">{problem.description}</p>
              <Link to={`/problem/${problem.id}`} 
                className="text-[#4FD1C5] hover:text-[#F97316] transition flex items-center"
              >
                Solve Now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to={'/problem'} className="bg-transparent border border-[#4FD1C5] px-6 py-3 rounded-lg hover:bg-[#4FD1C5] hover:bg-opacity-10 transition">
            View All Problems
          </Link>
        </div>
      </div>
      
      {/* Example Problem Walkthrough */}
     
      
      {/* Call to Action */}
      <div className=" py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master DSA with a Smart Edge?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers sharpening their coding skills using DSA2Z. Solve problems and get AI-powered insights that help you grow faster and code smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={'/pricing'} className="bg-gradient-to-r from-[#4FD1C5] via-gray to-[#F97316] px-8 py-4 rounded-lg text-white font-medium hover:opacity-90 transition">
              Get Started 
            </Link>
            
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className=" py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
               
                 <Link to="/" className="flex items-center gap-3 transition-transform scale-200 pl-5 hover:scale-205 duration-200">
          <img src="/logo.png" alt="DSA2Z Logo" className="w-25 h-10" />
        </Link>
              </div>
              <p className="text-gray-400">
                The ultimate platform to master data structures and algorithms.
              </p>
              <Link to="/cancellation-and-refund" className="text-gray-400 hover:text-[#4FD1C5] transition">Cancellation & Refund </Link>
              <Link to="/shipping-and-delivery" className="text-gray-400 hover:text-[#4FD1C5] transition">Shipping & Delivery</Link>
            </div>


            
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-gray-400 text-center">
            <p>© 2025 DSA2Z. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
};

export default LandingPage;
