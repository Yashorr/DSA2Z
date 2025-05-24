import React, { useEffect, useState } from 'react';
import { ChevronDown, Plus, Trash2, Edit, Filter, Loader, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useSubmissionStore } from '../store/useSubmissionStore';
import { useProblemStore } from '../store/useProblemStore';
import { usePlaylistStore } from '../store/usePlayListStore';
import LogoutButton from '../components/LogoutButton';

const ProfilePage = () => {
  const [activeFilter, setActiveFilter] = useState([]);
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [activeColor,setActiveColor] = useState("Total");
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const {authUser} = useAuthStore();
  const {isLoading,submissionsList,getAllSubmissions} = useSubmissionStore();
  const {problems,isProblemsLoading, getProblemById,getAllProblem,getSolvedProblems ,isProblemSolved, solvedProblems} = useProblemStore();
  const {isLoading:isPlayListLoading , playlists,getAllPlaylists, removeProblemFromPlaylist,isRemovingProblem,deletePlaylist} = usePlaylistStore();

  useEffect(()=>{
    const fetchData = async () =>{
      await getAllSubmissions();
      await getAllProblem();
      await getSolvedProblems();
      await getAllPlaylists();
    
    }

    
    fetchData();
    
  
    

   
    
  },[])

  

  useEffect(() => {
    setActiveFilter(submissionsList.slice(-10).reverse());
  }, [submissionsList]);

  const submissionLast10 = submissionsList.slice(-10).reverse();

  const acceptedNum = submissionsList.filter(submission => submission.status === 'Accepted').length;
  const submissionAcceptedLast10=submissionsList.filter((ele)=> ele.status==="Accepted").slice(-10).reverse();

  
  
  
  

  


  const solvedLast5 = solvedProblems.slice(-5).reverse();

  const easyNumber = solvedProblems.filter((ele)=>{
    return ele.difficulty==="EASY";
  })

  const mediumNumber = solvedProblems.filter((ele)=>{
    return ele.difficulty==="MEDIUM";

  })

  const hardNumber = solvedProblems.filter((ele)=>{
    return ele.difficulty==="HARD";
  })

 

  // Sample data
  

  

  const getProblemName = (id) =>{
    return problems.filter((problem) => problem.id == id)[0].title || "Loading" ;

  }

  

  

  
  
  
  


  const handleDeletePlaylist = async (id) => {
    await deletePlaylist(id);
    await getAllPlaylists();


    }
  

  const deleteProblemFromPlaylist = async (playlistId, problemId) => {
    console.log(playlistId,problemId);
    await removeProblemFromPlaylist(playlistId,problemId);
    await getAllPlaylists();

  };

  const getAvgTime = (array) =>{
    const array2=JSON.parse(array);
   const numbers = array2.map(time => parseFloat(time.replace(" s", "")));
   const sum = numbers.reduce((a, b) =>a+b);
    
    return (sum/numbers.length).toFixed(4);
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

  if(isLoading || isProblemsLoading || isProblemSolved ||isPlayListLoading  ) return (
    <div className='flex items-center justify-center h-screen'> 
        <Loader className=' size-10 animate-spin' />
      </div>
  )

  return (
    <div className="min-h-screen  relative overflow-hidden w-[65%] text-gray-300">
      {/* Gradient Background Blobs */}
       <div className="fixed top-16 left-0 w-1/3 h-1/3 bg-[#4FD1C5] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="fixed bottom-16 right-0 w-1/3 h-1/3 bg-[#F97316] opacity-20 blur-3xl z-[-1] rounded-md"></div>

      <div className="container mx-auto px-6 py-8 max-w-8xl">
        {/* Profile Section */}
        <div className=" rounded-2xl shadow-lg p-8 mb-8 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-100">Profile</h1>
            {/* <div className="flex gap-3">
              <button 
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="flex items-center gap-2 px-4 py-2 bg-[#4FD1C5] text-gray-900 font-medium rounded-lg hover:bg-[#3CBEB3] transition-colors"
              >
                <Edit size={16} />
                Edit Profile
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#F97316] text-gray-900 font-medium rounded-lg hover:bg-[#E85D04] transition-colors">
                Change Password
              </button>
            </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <div className="p-3  rounded-lg border border-gray-700">{authUser.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                <div className="p-3  rounded-lg border border-gray-700">{authUser.role}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <div className="p-3  rounded-lg border border-gray-700">{authUser.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">User ID</label>
                <div className="p-3  rounded-lg border border-gray-700 font-mono text-sm">{authUser.id}</div>
              </div>
            </div>
          </div>
        </div>

        {/* My Submissions Section */}
        <div className=" rounded-2xl shadow-lg p-8 mb-8 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-100">My Submissions</h2>
            <div className="flex gap-2">
              <button
                onClick={() =>{ setActiveFilter(submissionLast10); setActiveColor("Total")}}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeColor === "Total" 
                    ? 'bg-[#4FD1C5] text-gray-900 font-medium' 
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                All ({submissionsList.length})
              </button>
              <button
                onClick={() => {setActiveFilter(submissionAcceptedLast10) ; setActiveColor("Accepted")} }
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeColor === "Accepted"
                    ? 'bg-[#4FD1C5] text-gray-900 font-medium' 
                    : ' text-gray-400 hover:bg-gray-700'
                }`}
              >
                Accepted ({acceptedNum})
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {activeFilter.map((submission) => (
              <div key={submission.id} className="border border-gray-700 rounded-lg overflow-hidden">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => setExpandedSubmission(expandedSubmission === submission.id ? null : submission.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold text-gray-100">{getProblemName(submission.problemId)}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                      <span className="text-sm text-gray-400">{submission.language}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">{getAvgTime(submission.time)}</span>
                      <ChevronDown 
                        size={20} 
                        className={`text-gray-400 transition-transform ${
                          expandedSubmission === submission.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </div>
                </div>
                
                {expandedSubmission === submission.id && (
                  <div className="px-4 pb-4 border-t border-gray-700 bg-gray-800">
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-300 mb-2">Source Code:</h4>
                      <pre className="bg-gray-950 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        <code>{submission.sourceCode}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Problems Solved Section */}
        <div className=" rounded-2xl shadow-lg p-8 mb-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Problems Solved</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Recent Solutions</h3>
              <div className="space-y-3">
                {solvedLast5.map((problem, index) => (
                  <div key={index} className="flex items-center justify-between p-3  rounded-lg border border-gray-700">
                    <div>
                      <div className="font-medium text-gray-100">{problem.title}</div>
                      <div className="text-sm text-gray-400">{problem.createdAt.split("T")[0]}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Difficulty Breakdown</h3>
              <div className="overflow-hidden rounded-lg border border-gray-700">
                <table className="w-full">
                  <thead className="">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">Difficulty</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-300">Solved</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-green-400 bg-green-900/30">
                          Easy
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-lg font-semibold text-gray-100">
                        {easyNumber.length}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-yellow-400 bg-yellow-900/30">
                          Medium
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-lg font-semibold text-gray-100">
                        {mediumNumber.length}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-red-400 bg-red-900/30">
                          Hard
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-lg font-semibold text-gray-100">
                        {hardNumber.length}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* My Playlists Section */}
        <div className=" rounded-2xl shadow-lg p-8 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-100">My Playlists</h2>
           
          </div>

          

          <div className="space-y-4">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="border border-gray-700 rounded-lg overflow-hidden">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => setExpandedPlaylist(expandedPlaylist === playlist.id ? null : playlist.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center  gap-4">
                      <h3 className="font-semibold text-gray-100">{playlist.name}</h3>
                      <span className="text-sm text-gray-400">
                        {playlist.problems.length} problem{playlist.problems.length !== 1 ? 's' : ''}
                      </span>

                       
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePlaylist(playlist.id)}}
                          className="flex items-center gap-2 px-4 py-2 bg-[#F97316] text-gray-900 font-medium rounded-lg hover:bg-[#E85D04] transition-colors"
                        >
                          <Plus size={16} />
                        Delete Playlist
                        </button>
                        <ChevronDown 
                      size={20} 
                      className={`text-gray-400 transition-transform ${
                        expandedPlaylist === playlist.id ? 'rotate-180' : ''
                      }`} 
                    />
                    
                       
                    </div>
                     
                  </div>
                </div>
                
                {expandedPlaylist === playlist.id && (
                  <div className="px-4 pb-4 border-t border-gray-700 ">
                    <div className="mt-4 space-y-2">
                      {playlist.problems.length === 0 ? (
                        <p className="text-gray-400 text-center py-4">No problems in this playlist yet</p>
                      ) : (
                        playlist.problems.map((problem) => (
                          <div key={problem.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-gray-100">{problem.problem.title}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.problem.difficulty)}`}>
                                {problem.problem.difficulty}
                              </span>
                            </div>
                            <button
                              onClick={() => deleteProblemFromPlaylist(playlist.id, problem.problem.id)}
                              className="p-1 text-red-400 hover:bg-red-900/30 rounded transition-colors"
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
          <div className='flex justify-end w-[20%]'>
            <LogoutButton className="  gap-2 px-3 py-2 z-50 rounded-lg text-white/90 hover:bg-[#4FD1C5] hover:text-white transition-all duration-200 ease-in-out w-[5%] text-left">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
          </LogoutButton>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
