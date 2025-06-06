import React, { useState, useEffect } from "react"
import Editor  from "@monaco-editor/react";
import { Play, Terminal } from "lucide-react";
import {
  Loader,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  Code2,
  Users,
  ThumbsUp,
  Home,
  Brain,
  Bug,
  Zap,
  TrendingUp,
  Star,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useProblemStore } from "../store/useProblemStore"
import { useExecutionStore } from "../store/useExecutionStore";
import { getLanguageId } from "../lib/lang";
import SubmissionResults from "../components/SubmissionResult";
import SubmissionsList from "../components/SubmissionList";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { useAI } from "../store/useAI";



const ProblemPage = () => {
  const { id } = useParams()
  const { getProblemById, problem, isProblemLoading } = useProblemStore()
  const [code, setCode] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("java")
  const [activeTab, setActiveTab] = useState("description")
  const [testCases, setTestCases] = useState([])
  const [isBookmarked, setIsBookmarked] = useState(false)
  const {isExecuting , submission,clearSubmission, executeCode , isRunning ,runResult, runCode,clearRun } = useExecutionStore();
  const {submissionForSubmissionStore , isLoading:isSubmissionsLoading ,submissionCount,getSubmissionForProblem , getSubmissionCountForProblem  } = useSubmissionStore();
  const {isAiDataLoading, aiData ,analyzeCode ,  refreshAnalysis} = useAI();
  // First useEffect - for fetching problem data
  useEffect(() => {
    
    getProblemById(id)
    getSubmissionCountForProblem(id);
    getSubmissionForProblem(id)
    clearSubmission()
    clearRun()
    refreshAnalysis();
    
    // Don't log problem here as it won't be updated yet
  }, [id, getProblemById]) // Added getProblemById to dependency array

  useEffect(()=>{
    if(activeTab==="submissions"){
      getSubmissionForProblem(id)
      getSubmissionCountForProblem(id);
    }
    
  },[activeTab,id,submissionForSubmissionStore])

  const returnSuccess = () =>{

    const suc=submissionForSubmissionStore?.filter((ele)=> ele.status=="Accepted").length;

    return ((suc/submissionCount)*100) || 0;

  }
  
 
  

  

  // Second useEffect - for updating code and test cases when problem data changes
  useEffect(() => {
    
    if (problem) {
      setCode(problem.codeSnippets?.[selectedLanguage.toUpperCase()] || "")
      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || [],
      )
      
      
    }
  }, [problem, selectedLanguage])

 
  const handleLanguageChange = (e) => {
    const value = e.target.value
    setSelectedLanguage(value)
    setCode(problem.codeSnippets?.[value.toUpperCase()] || "")
  }

  const handleSubCode = (e) =>{
    e.preventDefault()
    try {
        const language_id = getLanguageId(selectedLanguage);
        const stdin = testCases.map((tc) => tc.input);
        const expected_output = testCases.map((tc) => tc.output);
       
        executeCode(code,language_id, stdin, expected_output , id);
        clearRun();
        
    } catch (error) {
        console.error("ERROR EXECUTING CODE" , error);

        
    }
  }

  const handleAnalyzeClick = (e) =>{
    e.preventDefault()
    try {
      const description = problem.description;
      analyzeCode(code,description);

      
    } catch (error) {
      console.error ("ERROR ANALYZING CODE" , error);
      
    }
  }

  

   const handleRunCode = (e) =>{
    e.preventDefault()
    try {
        const language_id = getLanguageId(selectedLanguage);
        const stdin = testCases.map((tc) => tc.input);
        const expected_output = testCases.map((tc) => tc.output);
       
        runCode(code,language_id, stdin, expected_output , id);
        clearSubmission();
        
    } catch (error) {
        console.error("ERROR EXECUTING CODE" , error);

        
    }
  }

  const getRatingColor = (rating) => {
    if (rating >= 90) return "text-green-500"
    if (rating >= 70) return "text-yellow-500"
    if (rating >= 50) return "text-orange-500"
    return "text-red-500"
  }

  const getRatingBgColor = (rating) => {
    if (rating >= 90) return "bg-green-900/30 border-green-700"
    if (rating >= 70) return "bg-yellow-900/30 border-yellow-700"
    if (rating >= 50) return "bg-orange-900/30 border-orange-700"
    return "bg-red-900/30 border-red-700"
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="space-y-6">
            <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6">
              <p className="text-lg leading-relaxed text-gray-300">{problem?.description}</p>
            </div>

            {problem?.examples && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[#4FD1C5]" />
                  Examples
                </h3>
                {Object.entries(problem.examples).map(([lang, example], idx) => (
                  <div key={lang} className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6 space-y-4">
                    <div>
                      <div className="text-[#4FD1C5] mb-2 text-sm font-semibold flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        Input:
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm px-4 py-3 rounded-lg font-mono text-green-400 border border-white/10">
                        {example.input}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#F97316] mb-2 text-sm font-semibold flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Output:
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm px-4 py-3 rounded-lg font-mono text-blue-400 border border-white/10">
                        {example.output}
                      </div>
                    </div>
                    {example.explanation && (
                      <div>
                        <div className="text-emerald-400 mb-2 text-sm font-semibold flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Explanation:
                        </div>
                        <div className="text-gray-300 bg-emerald-500/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-emerald-500/20">
                          {example.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {problem?.constraints && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Bug className="w-5 h-5 text-[#F97316]" />
                  Constraints
                </h3>
                <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6">
                  <div className="bg-black/40 backdrop-blur-sm px-4 py-3 rounded-lg font-mono text-yellow-400 border border-white/10">
                    {problem.constraints}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      case "submissions":
        return (
          <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6">
            <SubmissionsList
              submissions={submissionForSubmissionStore}
              isLoading={isSubmissionsLoading}
            />
          </div>
        )
      case "discussion":
        return (
          <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No discussions yet</p>
            <p className="text-gray-500 text-sm mt-2">Be the first to start a discussion!</p>
          </div>
        )
      case "hints":
        return (
          <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6">
            {problem?.hints ? (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Hint</span>
                </div>
                <div className="bg-black/40 backdrop-blur-sm px-4 py-3 rounded-lg font-mono text-yellow-300 border border-white/10">
                  {problem.hints}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Lightbulb className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No hints available</p>
                <p className="text-gray-500 text-sm mt-2">Try solving it on your own first!</p>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  if (isProblemLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  

  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Gradient Background Blobs */}
      <div className="fixed top-16 left-0 w-1/3 h-1/3 bg-[#4FD1C5] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="fixed bottom-16 right-0 w-1/3 h-1/3 bg-[#F97316] opacity-20 blur-3xl z-[-1] rounded-md"></div>

      {/* Navigation */}
      <nav className="backdrop-blur-sm bg-white/5 border-b border-white/10 px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={"/"} className="flex items-center gap-2 text-[#4FD1C5] hover:text-[#38B2AC] transition-colors">
              <Home className="w-6 h-6" />
              <ChevronRight className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{problem?.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    Updated{" "}
                    {problem?.createdAt &&
                      new Date(problem.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </span>
                </div>
                <span className="text-gray-600">•</span>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{submissionCount} Submissions</span>
                </div>
                <span className="text-gray-600">•</span>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">{returnSuccess().toFixed(2)}% Success</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                isBookmarked 
                  ? "bg-[#4FD1C5]/20 text-[#4FD1C5] border border-[#4FD1C5]/30" 
                  : "bg-white/10 text-gray-400 border border-white/20 hover:bg-white/20"
              }`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-xl bg-white/10 text-gray-400 border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-105">
              <Share2 className="w-5 h-5" />
            </button>
            <div className="relative">
              <select
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] focus:border-transparent backdrop-blur-sm appearance-none cursor-pointer hover:bg-white/15 transition-all duration-200 pr-10"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                {Object.keys(problem?.codeSnippets || {}).map((lang) => (
                  <option key={lang} value={lang} className="bg-gray-800">
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description Panel */}
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
            <div className="border-b border-white/10">
              <div className="flex">
                <button
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === "description" 
                      ? "text-[#4FD1C5] border-[#4FD1C5] bg-[#4FD1C5]/10" 
                      : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === "submissions" 
                      ? "text-[#4FD1C5] border-[#4FD1C5] bg-[#4FD1C5]/10" 
                      : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                <button
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === "discussion" 
                      ? "text-[#4FD1C5] border-[#4FD1C5] bg-[#4FD1C5]/10" 
                      : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Discussion
                </button>
                <button
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === "hints" 
                      ? "text-[#4FD1C5] border-[#4FD1C5] bg-[#4FD1C5]/10" 
                      : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                  Hints
                </button>
              </div>
            </div>
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {renderTabContent()}
            </div>
          </div>

          {/* Code Editor Panel */}
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
            <div className="border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2 px-6 py-4">
                <Terminal className="w-5 h-5 text-[#4FD1C5]" />
                <span className="text-[#4FD1C5] font-medium">Code Editor</span>
              </div>
            </div>

            <div className="h-[450px] w-full bg-black/20">
              <Editor
                height="100%"
                language={selectedLanguage.toLowerCase()}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  automaticLayout: true,
                }}
              />
            </div>

            <div className="p-6 border-t border-white/10 bg-white/5">
              <div className="flex justify-between items-center">
                <button 
                  className={`flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 rounded-xl font-semibold hover:bg-green-500/30 transition-all duration-200 border border-green-500/30 ${
                    isRunning ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                  }`}
                  onClick={handleRunCode}
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  Run Code
                </button>
                <div className="flex gap-3">
                  <button 
                    className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4FD1C5]/20 to-[#F97316]/20 text-white rounded-xl font-semibold hover:from-[#4FD1C5]/30 hover:to-[#F97316]/30 transition-all duration-200 border border-[#4FD1C5]/30 ${
                      isAiDataLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                    }`}
                    onClick={handleAnalyzeClick}
                    disabled={isAiDataLoading}
                  >
                    {isAiDataLoading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                       "AI Analyze✨"
                    )}
                   
                  </button>
                  <button 
                    className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4FD1C5] to-[#38B2AC] text-white rounded-xl font-semibold hover:from-[#38B2AC] hover:to-[#319795] transition-all duration-200 shadow-lg ${
                      isExecuting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                    }`}
                    onClick={handleSubCode}
                    disabled={isExecuting}
                  >
                    {isExecuting ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    Submit Solution
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Section */}
        {aiData && (
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 shadow-xl mt-8 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-gradient-to-r from-[#4FD1C5] to-[#F97316] rounded-2xl shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent">
                    AI Code Analysis ✨
                  </h3>
                  <p className="text-gray-400 mt-1">Intelligent insights for your code</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Rating Card */}
                <div className={`p-6 rounded-xl border-2 backdrop-blur-sm ${getRatingBgColor(aiData.rating)}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Star className={`w-6 h-6 ${getRatingColor(aiData.rating)}`} />
                    <span className="font-semibold text-white">Code Rating</span>
                  </div>
                  <div className={`text-4xl font-bold ${getRatingColor(aiData.rating)}`}>
                    {aiData.rating}/100
                  </div>
                </div>

                {/* Time & Space Complexity */}
                <div className="p-6 rounded-xl border-2 bg-[#4FD1C5]/20 border-[#4FD1C5]/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-6 h-6 text-[#4FD1C5]" />
                    <span className="font-semibold text-white">Complexity</span>
                  </div>
                  <div className="text-sm text-[#4FD1C5] font-mono font-semibold">
                    {aiData["tc&sc"]}
                  </div>
                </div>

                {/* Bug Status */}
                <div className="p-6 rounded-xl border-2 bg-[#F97316]/20 border-[#F97316]/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Bug className="w-6 h-6 text-[#F97316]" />
                    <span className="font-semibold text-white">Bug Detection</span>
                  </div>
                  <div className="text-sm">
                    {aiData.bugs.includes("No bugs") ? (
                      <span className="text-green-400 font-semibold">✓ Clean Code</span>
                    ) : (
                      <span className="text-red-400 font-semibold">⚠ Issues Found</span>
                    )}
                  </div>
                </div>

                {/* Improvement Status */}
                <div className="p-6 rounded-xl border-2 bg-gradient-to-br from-[#4FD1C5]/20 to-[#F97316]/20 border-[#4FD1C5]/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                    <span className="font-semibold text-white">Optimization</span>
                  </div>
                  <div className="text-sm">
                    {aiData.improvement.includes("already quite efficient") ? (
                      <span className="text-green-400 font-semibold">✓ Optimized</span>
                    ) : (
                      <span className="text-orange-400 font-semibold">📈 Can Improve</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Description Section */}
                <div className="bg-gradient-to-br from-[#4FD1C5]/10 to-[#4FD1C5]/20 p-6 rounded-xl border border-[#4FD1C5]/40 backdrop-blur-sm">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#4FD1C5]" />
                    Code Description
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{aiData.description}</p>
                </div>

                {/* Bugs Section */}
                <div className="bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/20 p-6 rounded-xl border border-[#F97316]/40 backdrop-blur-sm">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Bug className="w-5 h-5 text-[#F97316]" />
                    Bug Analysis
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{aiData.bugs}</p>
                </div>
              </div>

              {/* Improvement Section */}
              <div className="bg-gradient-to-br from-[#4FD1C5]/10 via-gray-800/20 to-[#F97316]/10 p-6 rounded-xl border border-[#4FD1C5]/40 backdrop-blur-sm">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Improvement Suggestions
                </h4>
                <p className="text-gray-300 leading-relaxed">{aiData.improvement}</p>
              </div>
            </div>
          </div>
        )}

        {/* Test Cases and Results Section */}
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 shadow-xl mt-8 overflow-hidden">
          <div className="p-8">
            {runResult ? (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Terminal className="w-6 h-6 text-[#4FD1C5]" />
                  <h3 className="text-2xl font-bold text-white">Run Results</h3>
                </div>
                <SubmissionResults submission={runResult} />
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-[#4FD1C5]" />
                  <h3 className="text-2xl font-bold text-white">Test Cases</h3>
                </div>
                <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-white/10">
                      <tr className="border-b border-white/10">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Input</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Expected Output</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {testCases.map((testCase, index) => (
                        <tr key={index} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-mono text-green-400 bg-black/20">{testCase.input}</td>
                          <td className="px-6 py-4 font-mono text-blue-400 bg-black/20">{testCase.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {submission && (
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="w-6 h-6 text-[#F97316]" />
                  <h3 className="text-2xl font-bold text-white">Submission Results</h3>
                </div>
                <SubmissionResults submission={submission} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div> 
  )
}

export default ProblemPage