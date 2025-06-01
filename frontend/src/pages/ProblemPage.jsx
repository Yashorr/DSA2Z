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
    console.log("Second useEffect triggered", problem)
    if (problem) {
      setCode(problem.codeSnippets?.[selectedLanguage.toUpperCase()] || "")
      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || [],
      )
      console.log("Code and test cases updated",testCases)
      console.log();
      
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
          <div className="prose max-w-none">
            <p className="text-lg mb-6">{problem?.description}</p>

            {problem?.examples && (
              <>
                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                {Object.entries(problem.examples).map(([lang, example], idx) => (
                  <div key={lang} className="bg-base-200 p-6 rounded-xl mb-6 font-mono">
                    <div className="mb-4">
                      <div className="text-indigo-300 mb-2 text-base font-semibold">Input:</div>
                      <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">{example.input}</span>
                    </div>
                    <div className="mb-4">
                      <div className="text-indigo-300 mb-2 text-base font-semibold">Output:</div>
                      <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                        {example.output}
                      </span>
                    </div>
                    {example.explanation && (
                      <div>
                        <div className="text-emerald-300 mb-2 text-base font-semibold">Explanation:</div>
                        <p className="text-base-content/70 text-lg font-sem">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {problem?.constraints && (
              <>
                <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                <div className="bg-base-200 p-6 rounded-xl mb-6">
                  <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                    {problem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        )
      case "submissions":
        return (
            <SubmissionsList
              submissions={submissionForSubmissionStore}
              isLoading={isSubmissionsLoading}
            />
          // <h2>No submissions yet</h2>
        )
      case "discussion":
        return <div className="p-4 text-center text-base-content/70">No discussions yet</div>
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-base-200 p-6 rounded-xl">
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-base-content/70">No hints available</div>
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
    <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-200 max-w-7xl w-full">
       <div className="fixed top-16 left-0 w-1/3 h-1/3 bg-[#4FD1C5] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="fixed bottom-16 right-0 w-1/3 h-1/3 bg-[#F97316] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <nav className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1 gap-2">
          <Link to={"/"} className="flex items-center gap-2 text-primary">
            <Home className="w-6 h-6" />
            <ChevronRight className="w-4 h-4" />
          </Link>
          <div className="mt-2">
            <h1 className="text-xl font-bold">{problem?.title}</h1>
            <div className="flex items-center gap-2 text-sm text-base-content/70 mt-5">
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
              <span className="text-base-content/30">•</span>
              <Users className="w-4 h-4" />
              <span>{submissionCount} Submissions</span>
              <span className="text-base-content/30">•</span>
              <ThumbsUp className="w-4 h-4" />
              <span>{returnSuccess().toFixed(2)}% Success Rate</span>
            </div>
          </div>
        </div>
        <div className="flex-none gap-4">
          <button
            className={`btn btn-ghost btn-circle ${isBookmarked ? "text-primary" : ""}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="btn btn-ghost btn-circle">
            <Share2 className="w-5 h-5" />
          </button>
          <select
            className="select select-bordered select-primary w-40"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            
          >
            {Object.keys(problem?.codeSnippets || {}).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-0">
              <div className="tabs tabs-bordered">
                <button
                  className={`tab gap-2 ${activeTab === "description" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  className={`tab gap-2 ${activeTab === "submissions" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                <button
                  className={`tab gap-2 ${activeTab === "discussion" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Discussion
                </button>
                <button
                  className={`tab gap-2 ${activeTab === "hints" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                  Hints
                </button>
              </div>

              <div className="p-6">{renderTabContent()}</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-0">
              <div className="tabs tabs-bordered">
                <button className="tab tab-active gap-2">
                  <Terminal className="w-4 h-4" />
                  Code Editor
                </button>
              </div>

              <div className="h-[450px] w-full">
                <Editor
                  height="100%"
                  language={selectedLanguage.toLowerCase()}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 20,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              <div className="p-4 border-t border-base-300 bg-base-200">
                <div className="flex justify-between items-center">
                  
                  <button className={`btn btn-success gap-2 ${
                      isRunning ? "loading" : ""
                    }`}
                    onClick={handleRunCode}
                    disabled={isRunning} >
                      {!isRunning && <Play className="w-4 h-4" />}
                    Run Code
                  </button>
                  <div>
                  <button className={`btn  bg-gradient-to-br from-[#4FD1C5]/20 to-[#F97316]/20  gap-2  ${
                      isAiDataLoading ? "loading mr-5" : "mr-2"
                    }`}
                    onClick={handleAnalyzeClick}
                    disabled={isAiDataLoading}
                    >
                      {!isAiDataLoading && <Play className="w-4 h-4" />}
                    AI Analyze✨
                  </button>
                  <button 
                    className={`btn btn-primary gap-2 ${
                      isExecuting ? "loading" : ""
                    }`}
                    onClick={handleSubCode}
                    disabled={isExecuting}
                  >
                    {!isExecuting && <Play className="w-4 h-4" />}
                    Submit Solution
                  </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>

        {/* AI Analysis Section */}
        {aiData && (
          <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-[#4FD1C5] to-[#F97316] rounded-full">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent">
                    AI Code Analysis ✨
                  </h3>
                  <p className="text-gray-300">Intelligent insights for your code</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Rating Card */}
                <div className={`p-4 rounded-xl border-2 ${getRatingBgColor(aiData.rating)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className={`w-5 h-5 ${getRatingColor(aiData.rating)}`} />
                    <span className="font-semibold text-gray-300">Code Rating</span>
                  </div>
                  <div className={`text-3xl font-bold ${getRatingColor(aiData.rating)}`}>
                    {aiData.rating}/100
                  </div>
                </div>

                {/* Time & Space Complexity */}
                <div className="p-4 rounded-xl border-2 bg-[#4FD1C5]/20 border-[#4FD1C5]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-gray-300">Complexity</span>
                  </div>
                  <div className="text-sm text-gray-400 font-mono">
                    {aiData["tc&sc"]}
                  </div>
                </div>

                {/* Bug Status */}
                <div className="p-4 rounded-xl border-2 bg-[#F97316]/20 border-[#F97316]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Bug className="w-5 h-5 text-amber-500" />
                    <span className="font-semibold text-gray-300">Bug Detection</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {aiData.bugs.includes("No bugs") ? (
                      <span className="text-green-400 font-semibold">✓ Clean Code</span>
                    ) : (
                      <span className="text-red-400 font-semibold">⚠ Issues Found</span>
                    )}
                  </div>
                </div>

                {/* Improvement Status */}
                <div className="p-4 rounded-xl border-2 bg-gradient-to-br from-[#4FD1C5]/20 to-[#F97316]/20 border-[#4FD1C5]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <span className="font-semibold text-gray-300">Optimization</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {aiData.improvement.includes("already quite efficient") ? (
                      <span className="text-green-400 font-semibold">✓ Optimized</span>
                    ) : (
                      <span className="text-orange-400 font-semibold">📈 Can Improve</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Description Section */}
                <div className="bg-gradient-to-br from-[#4FD1C5]/10 to-[#4FD1C5]/20 p-6 rounded-xl border border-[#4FD1C5]/40">
                  <h4 className="text-lg font-bold text-gray-200 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#4FD1C5]" />
                    Code Description
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{aiData.description}</p>
                </div>

                {/* Bugs Section */}
                <div className="bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/20 p-6 rounded-xl border border-[#F97316]/40">
                  <h4 className="text-lg font-bold text-amber-200 mb-3 flex items-center gap-2">
                    <Bug className="w-5 h-5 text-[#F97316]" />
                    Bug Analysis
                  </h4>
                  <p className="text-amber-300 leading-relaxed">{aiData.bugs}</p>
                </div>
              </div>

              {/* Improvement Section */}
              <div className="mt-6 bg-gradient-to-br via-gray-800 from-[#4FD1C5]/10 to-[#F97316]/10 p-6 rounded-xl border border-[#4FD1C5]/40">
                <h4 className="text-lg font-bold text-emerald-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Improvement Suggestions
                </h4>
                <p className="text-emerald-300 leading-relaxed">{aiData.improvement}</p>
              </div>
            </div>
          </div>
        )}

         <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            {runResult ? (
              <SubmissionResults submission={runResult} />
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Test Cases</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Input</th>
                        <th>Expected Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testCases.map((testCase, index) => (
                        <tr key={index}>
                          <td className="font-mono">{testCase.input}</td>
                          <td className="font-mono">{testCase.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {submission ? (
              <SubmissionResults submission={submission} />
            ) : (
              <>
                
                
              </>
            )}
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default ProblemPage