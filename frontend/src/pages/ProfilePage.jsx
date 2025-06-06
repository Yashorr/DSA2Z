import React, { useEffect, useState } from 'react';
import { ChevronDown, Plus, Trash2, Edit, Filter, Loader, LogOut, TrendingUp, Calendar, Award, Target, Home, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { useAuthStore } from '../store/useAuthStore';
import { useSubmissionStore } from '../store/useSubmissionStore';
import { useProblemStore } from '../store/useProblemStore';
import { usePlaylistStore } from "../store/usePlaylistStore"
import LogoutButton from '../components/LogoutButton';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [activeFilter, setActiveFilter] = useState([]);
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [activeColor, setActiveColor] = useState("Total");
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const { authUser, token } = useAuthStore();
  const { isLoading, submissionsList, getAllSubmissions } = useSubmissionStore();
  const { problems, isProblemsLoading, getProblemById, getAllProblem, getSolvedProblems, isProblemSolved, solvedProblems } = useProblemStore();
  const { isLoading: isPlayListLoading, playlists, getAllPlaylists, removeProblemFromPlaylist, isRemovingProblem, deletePlaylist } = usePlaylistStore();

  useEffect(() => {
    const fetchData = async () => {
     try {
        await Promise.all([getAllSubmissions(), getAllProblem(), getSolvedProblems(), getAllPlaylists()])
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    setActiveFilter(submissionsList.slice(-10).reverse());
  }, [submissionsList]);

  const submissionLast10 = submissionsList.slice(-10).reverse();
  const acceptedNum = submissionsList.filter(submission => submission.status === 'Accepted').length;
  const submissionAcceptedLast10 = submissionsList.filter((ele) => ele.status === "Accepted").slice(-10).reverse();
  const solvedLast5 = solvedProblems.slice(-5).reverse();

  const easyNumber = solvedProblems.filter((ele) => {
    return ele.difficulty === "EASY";
  })

  const mediumNumber = solvedProblems.filter((ele) => {
    return ele.difficulty === "MEDIUM";
  })

  const hardNumber = solvedProblems.filter((ele) => {
    return ele.difficulty === "HARD";
  })

  const getProblemName = (id) => {
    return problems.filter((problem) => problem.id == id)[0]?.title || "Loading";
  }

  const handleDeletePlaylist = async (id) => {
    await deletePlaylist(id);
    await getAllPlaylists();
  }

  const deleteProblemFromPlaylist = async (playlistId, problemId) => {
    console.log(playlistId, problemId);
    await removeProblemFromPlaylist(playlistId, problemId);
    await getAllPlaylists();
  };

  const getAvgTime = (array) => {
    const array2 = JSON.parse(array);
    const numbers = array2.map(time => parseFloat(time.replace(" s", "")));
    const sum = numbers.reduce((a, b) => a + b);
    return (sum / numbers.length).toFixed(4);
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY': return 'text-green-400 bg-green-900/30';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-900/30';
      case 'HARD': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Accepted' ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30';
  };

  // Chart data preparation
  const difficultyData = [
    { name: 'Easy', value: easyNumber.length, color: '#10B981' },
    { name: 'Medium', value: mediumNumber.length, color: '#F59E0B' },
    { name: 'Hard', value: hardNumber.length, color: '#EF4444' }
  ];

  const submissionData = submissionsList.slice(-7).map((submission, index) => ({
    day: `Day ${index + 1}`,
    submissions: 1,
    accepted: submission.status === 'Accepted' ? 1 : 0
  }));

  const totalSolved = solvedProblems.length;
  const totalProblems = problems.length;
  const solveRate = totalProblems > 0 ? ((totalSolved / totalProblems) * 100).toFixed(1) : 0;

  const statsData = [
    { title: "Total Solved", value: totalSolved, icon: Target, color: "text-[#4FD1C5]" },
    { title: "Acceptance Rate", value: `${((acceptedNum / submissionsList.length) * 100 || 0).toFixed(1)}%`, icon: TrendingUp, color: "text-green-400" },
    { title: "Total Submissions", value: submissionsList.length, icon: Calendar, color: "text-[#F97316]" },
    { title: "Playlists", value: playlists.length, icon: Award, color: "text-purple-400" }
  ];

  if (isLoading || isProblemsLoading || isProblemSolved || isPlayListLoading) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  )

  return (
    <div className="min-h-screen relative overflow-hidden w-[65%] text-gray-300">
      {/* Gradient Background Blobs */}
      <div className="fixed top-16 left-0 w-1/3 h-1/3 bg-[#4FD1C5] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="fixed bottom-16 right-0 w-1/3 h-1/3 bg-[#F97316] opacity-20 blur-3xl z-[-1] rounded-md"></div>

      <div className="container mx-auto px-6 py-8 max-w-8xl">
        {/* Profile Section */}
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-800/50">
        <Link to={"/"} className="flex items-center gap-2 text-[#4FD1C5] hover:text-[#38B2AC] transition-colors">
                      <Home className="w-6 h-6" />
                      <ChevronRight className="w-4 h-4" />
                    </Link>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-100 bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent">
              Profile Dashboard
            </h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <div key={index} className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Name</label>
                <div className="p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-gray-700/50 text-gray-100 font-medium">
                  {authUser.name}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Role</label>
                <div className="p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-gray-700/50 text-gray-100 font-medium">
                  {authUser.role}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Email</label>
                <div className="p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-gray-700/50 text-gray-100 font-medium">
                  {authUser.email}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">User ID</label>
                <div className="p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-gray-700/50 font-mono text-sm text-gray-100">
                  {authUser.id}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-400 mb-3">AI Tokens Left</label>
            <div className="p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-gray-700/50 text-gray-100 font-medium">
              {token}
            </div>
          </div>
        </div>

        {/* Statistics Overview with Charts */}
        {solvedProblems.length !== 0 ? (
          <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-800/50">
          <h2 className="text-3xl font-bold text-gray-100 mb-8 bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent">
            Coding Statistics
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Difficulty Breakdown Pie Chart */}
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-gray-100 mb-6 text-center">Problems by Difficulty</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={difficultyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {difficultyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F3F4F6'
                      }} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <div className="text-3xl font-bold text-[#4FD1C5]">{totalSolved}</div>
                <div className="text-sm text-gray-400">Total Solved</div>
              </div>
            </div>

             {/* Progress Ring */}
            
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-8 border border-gray-700/50 text-center">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">Overall Progress</h3>
              <div className="relative inline-block">
                <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="#1F2937" strokeWidth="8" fill="none" />
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    stroke="#4FD1C5" 
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray={`${(solveRate * 314) / 100} 314`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#4FD1C5]">{solveRate}%</div>
                    <div className="text-xs text-gray-400">Complete</div>
                  </div>
                </div>
              </div>
            </div>
          
            
          </div>

         
          
        </div>

        ) : (
           <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-800/50">
          <h2 className="text-3xl font-bold text-gray-100 mb-8 bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent">
            Coding Statistics
          </h2>
          <h4>No Solved Problems yet</h4>

          </div>
        )}
        {/* My Submissions Section */}
        {submissionsList.length !==0 ? (
          <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-800/50">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-100 bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent">
              My Submissions
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => { setActiveFilter(submissionLast10); setActiveColor("Total") }}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${activeColor === "Total"
                    ? 'bg-gradient-to-r from-[#4FD1C5] to-[#3CBEB3] text-gray-900 font-medium shadow-lg'
                    : 'backdrop-blur-lg bg-white/5 text-gray-400 hover:bg-white/10 border border-gray-700/50'
                  }`}
              >
                All ({submissionsList.length})
              </button>
              <button
                onClick={() => { setActiveFilter(submissionAcceptedLast10); setActiveColor("Accepted") }}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${activeColor === "Accepted"
                    ? 'bg-gradient-to-r from-[#4FD1C5] to-[#3CBEB3] text-gray-900 font-medium shadow-lg'
                    : 'backdrop-blur-lg bg-white/5 text-gray-400 hover:bg-white/10 border border-gray-700/50'
                  }`}
              >
                Accepted ({acceptedNum})
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {activeFilter.map((submission) => (
              <div key={submission.id} className="backdrop-blur-lg bg-white/5 border border-gray-700/50 rounded-xl overflow-hidden hover:border-gray-600/50 transition-all duration-300">
                <div
                  className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedSubmission(expandedSubmission === submission.id ? null : submission.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <h3 className="font-semibold text-gray-100 text-lg">{getProblemName(submission.problemId)}</h3>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                      <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">{submission.language}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-300 font-mono">{getAvgTime(submission.time)}s</span>
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform duration-300 ${expandedSubmission === submission.id ? 'rotate-180' : ''
                          }`}
                      />
                    </div>
                  </div>
                </div>

                {expandedSubmission === submission.id && (
                  <div className="px-6 pb-6 border-t border-gray-700/50 bg-gray-900/30">
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-300 mb-4 text-lg">Source Code:</h4>
                      <pre className="bg-gray-950/80 text-green-400 p-6 rounded-xl overflow-x-auto text-sm font-mono border border-gray-800/50">
                        <code>{submission.sourceCode}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        ) : (
           <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-800/50">
          
            <h2 className="text-3xl font-bold mb-8 text-gray-100 bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent">
              My Submissions
            </h2>
            <h3>No submissions yet</h3>

          
          </div>
        )}

        {/* Problems Solved Section */}
        {
          solvedProblems.length !== 0 ? (
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-800/50">
          <h2 className="text-3xl font-bold text-gray-100 mb-8 bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent">
            Problems Solved
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-300 mb-6">Recent Solutions</h3>
              <div className="space-y-4">
                {solvedLast5.map((problem, index) => (
                  <div key={index} className="flex items-center justify-between p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                    <div>
                      <div className="font-medium text-gray-100 text-lg">{problem.title}</div>
                      <div className="text-sm text-gray-400 mt-1">{problem.createdAt.split("T")[0]}</div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-300 mb-6">Difficulty Breakdown</h3>
              <div className="backdrop-blur-lg bg-white/5 overflow-hidden rounded-xl border border-gray-700/50">
                <table className="w-full">
                  <thead className="bg-gray-900/30">
                    <tr>
                      <th className="px-6 py-4 text-left font-medium text-gray-300">Difficulty</th>
                      <th className="px-6 py-4 text-right font-medium text-gray-300">Solved</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="px-4 py-2 rounded-full text-sm font-medium text-green-400 bg-green-900/30">
                          Easy
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-xl font-semibold text-gray-100">
                        {easyNumber.length}
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="px-4 py-2 rounded-full text-sm font-medium text-yellow-400 bg-yellow-900/30">
                          Medium
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-xl font-semibold text-gray-100">
                        {mediumNumber.length}
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="px-4 py-2 rounded-full text-sm font-medium text-red-400 bg-red-900/30">
                          Hard
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-xl font-semibold text-gray-100">
                        {hardNumber.length}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
          ) : (
             <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-800/50">
          <h2 className="text-3xl font-bold text-gray-100 mb-8 bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent">
            Problems Solved
          </h2>
          <h4>No Solved Problems yet</h4>

          </div>
          )
        }

        {/* My Playlists Section */}
        {playlists.length !== 0 ? (
          <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl p-8 mb-8  border border-gray-800/50">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-100 bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent">
              My Playlists
            </h2>
          </div>

          <div className="space-y-6">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="backdrop-blur-lg bg-white/5 border border-gray-700/50 rounded-xl overflow-hidden hover:border-gray-600/50 transition-all duration-300">
                <div
                  className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedPlaylist(expandedPlaylist === playlist.id ? null : playlist.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <h3 className="font-semibold text-gray-100 text-xl">{playlist.name}</h3>
                      <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                        {playlist.problems.length} problem{playlist.problems.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePlaylist(playlist.id)
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-[#C2410C] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        <Trash2 size={16} />
                        Delete Playlist
                      </button>
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform duration-300 ${expandedPlaylist === playlist.id ? 'rotate-180' : ''
                          }`}
                      />
                    </div>
                  </div>
                </div>

                {expandedPlaylist === playlist.id && (
                  <div className="px-6 pb-6 border-t border-gray-700/50 bg-gray-900/30">
                    <div className="mt-6 space-y-3">
                      {playlist.problems.length === 0 ? (
                        <p className="text-gray-400 text-center py-8 text-lg">No problems in this playlist yet</p>
                      ) : (
                        playlist.problems.map((problem) => (
                          <div key={problem.id} className="flex items-center justify-between p-4 bg-gray-950/50 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                            <div className="flex items-center gap-4">
                              <span className="font-medium text-gray-100 text-lg">{problem.problem.title}</span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.problem.difficulty)}`}>
                                {problem.problem.difficulty}
                              </span>
                            </div>
                            <button
                              onClick={() => deleteProblemFromPlaylist(playlist.id, problem.problem.id)}
                              className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          
        </div>
        ) : (
         <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-800/50">
          <h2 className="text-3xl font-bold text-gray-100 mb-8 bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent">
            My Playlists
          </h2>
          <h4>No playlists yet</h4>

          </div>
        )}

        <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl p-8 m border border-gray-800/50">
            <div className='flex justify-end  w-[20%]'>
            <LogoutButton className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl text-white hover:from-[#4FD1C5] hover:to-[#3CBEB3] hover:text-gray-900 transition-all duration-300 font-medium shadow-lg">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </LogoutButton>
          </div>
            
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;