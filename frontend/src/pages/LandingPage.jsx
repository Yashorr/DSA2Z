
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
    { id: "dp", name: "Dynamic Programming" },
    { id: "graphs", name: "Graphs" },
    { id: "trees", name: "Trees" },
  ];

  const featuredProblems = [
    { 
      id: 1, 
      title: "Two Sum", 
      difficulty: "easy", 
      category: "arrays",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
    },
    { 
      id: 2, 
      title: "Longest Palindromic Substring", 
      difficulty: "medium", 
      category: "dp",
      description: "Given a string s, return the longest palindromic substring in s."
    },
    { 
      id: 3, 
      title: "Merge K Sorted Lists", 
      difficulty: "hard", 
      category: "trees",
      description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order."
    },
    { 
      id: 4, 
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
    { label: "Problems", value: "30+" },
    { label: "Topics", value: "20+" },
    { label: "Difficulty Levels", value: "3" },
    { label: "languages" , value: "3" },
  ];

  return (
     <div className='w-full'>
         
    <div className="min-h-screen    text-white overflow-hidden relative">
      {/* Gradient Blobs */}
      <div className="fixed top-16 left-0 w-1/3 h-1/3 bg-[#4FD1C5] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="fixed bottom-16 right-0 w-1/3 h-1/3 bg-[#F97316] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      
     
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
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
            <br /> Step by Step
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            A comprehensive platform to help you excel in coding interviews with curated problems, 
            efficient solutions, and interactive learning paths.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/problem" className="bg-gradient-to-r from-[#4FD1C5] to-[#F97316] px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition flex items-center justify-center">
              Start Practicing <ArrowRight className="ml-2 h-5 w-5" />
              
            </Link>
            <button className="bg-transparent border border-gray-600 px-6 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition">
              Explore Learning Paths
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className=" py-12">
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
              <a 
                href="#" 
                className="text-[#4FD1C5] hover:text-[#F97316] transition flex items-center"
              >
                Solve Now <ArrowRight className="ml-1 h-4 w-4" />
              </a>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master DSA?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are improving their coding skills and acing interviews with DSA2Z.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={'/problem'} className="bg-gradient-to-r from-[#4FD1C5] to-[#F97316] px-8 py-4 rounded-lg text-white font-medium hover:opacity-90 transition">
              Get Started for Free
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
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#4FD1C5] transition">Problems</a></li>
                <li><a href="#" className="hover:text-[#4FD1C5] transition">Learning Paths</a></li>
                <li><a href="#" className="hover:text-[#4FD1C5] transition">Contests</a></li>
                <li><a href="#" className="hover:text-[#4FD1C5] transition">Interview Prep</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#4FD1C5] transition">About</a></li>
                <li><a href="#" className="hover:text-[#4FD1C5] transition">Careers</a></li>
                <li><a href="#" className="hover:text-[#4FD1C5] transition">Blog</a></li>
                <li><a href="#" className="hover:text-[#4FD1C5] transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#4FD1C5] transition">Discord</a></li>
                <li><a href="#" className="hover:text-[#4FD1C5] transition">Twitter</a></li>
                <li><a href="#" className="hover:text-[#4FD1C5] transition">GitHub</a></li>
                <li><a href="#" className="hover:text-[#4FD1C5] transition">YouTube</a></li>
              </ul>
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
