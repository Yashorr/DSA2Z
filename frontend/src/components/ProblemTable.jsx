import React ,{use, useEffect ,useMemo, useState ,  lazy, Suspense} from 'react'
import{ useAuthStore} from "../store/useAuthStore"

import { Link } from "react-router-dom";

import { Bookmark, PencilIcon, Trash, TrashIcon, Plus, Loader2, Home, ChevronRight } from "lucide-react";
import { useActions } from '../store/useAction';
import { usePlaylistStore } from '../store/usePlaylistStore';
const AddToPlaylist = lazy(() => import('./AddToPlaylist'));
const CreatePlaylistModal = lazy(() => import('./CreatePlaylistModal'));

const ProblemTable = ({problems}) => {
    const {authUser} = useAuthStore()
    const {createPlaylist,getAllPlaylists} = usePlaylistStore (); 
    const {isDeletingProblem,isUpdatingProblem, onDeleteProblem,onEditProblem} = useActions();

    const [isCreateModelOpen, setIsCreateModelOpen] = useState(false);
    const [isAddToPlaylistModelOpen , setIsAddToPlaylistModelOpen] = useState(false);
    const [idToAdd, setIdToAdd] = useState(null);

    const [search , setSearch] = useState("");
    const [difficulty , setDifficulty] = useState("ALL");
    const [selectedTag , setSelectedTag] = useState("ALL");
    const [currentPage , setCurrentPage] = useState(1);
    const difficulties = [ "EASY", "MEDIUM", "HARD"];
    const allTags = useMemo(()=>{
        if(!Array.isArray(problems)) return [];
        const tagSet = new Set();
        problems.forEach(problem => {
            problem.tags?.forEach(tag => {
                tagSet.add(tag)
            })
        })
        return Array.from(tagSet);


    });
    const filteredProblems = useMemo(() =>{
        setCurrentPage(1);
        
        return (problems || []).filter(problem => problem.title.toLowerCase().includes(search.toLowerCase()))
        .filter((problem) => difficulty == "ALL" ? true : problem.difficulty == difficulty)
        .filter((problem) => selectedTag == "ALL" ? true : problem.tags?.includes(selectedTag))
        
    },[problems , search, difficulty, selectedTag]);

    const itemsPerPage = 10;

    const totalPages = Math.ceil(filteredProblems.length/itemsPerPage);
    const paginatedProblems = useMemo(() =>{
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredProblems.slice(start , end);
    
    },[currentPage , filteredProblems])

    const handleDelete = (problemId) =>{
      onDeleteProblem(problemId);
    }


    const handleAddToPlaylist = (problemId) =>{
      setIsAddToPlaylistModelOpen(true);
      setIdToAdd(problemId);


    }

    const handleCreatePlaylist = async (data) =>{
        await createPlaylist(data);
        await getAllPlaylists();
    }


  return (
    <div className="w-full mx-auto mt-10 px-6">
      {/* Header Section */}
      <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-8 mb-8 shadow-xl">
        <div className="flex justify-between items-center">
           
          <div>
            <div className="flex items-center gap-2">
            <Link to={"/"} className="flex items-center gap-2 text-[#4FD1C5] hover:text-[#38B2AC] transition-colors">
                      <Home className="w-6 h-6" />
                      <ChevronRight className="w-4 h-4" />
                    </Link>
            <h2 className="text-4xl font-bold text-gray-100 bg-gradient-to-r from-[#4FD1C5] to-[#F97316] bg-clip-text text-transparent mb-2">Problems</h2>
            </div>
            <p className="text-gray-300">Solve coding challenges to improve your skills</p>
          </div>
          <button 
            className="bg-gradient-to-r from-[#4FD1C5] to-[#38B2AC] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#38B2AC] hover:to-[#319795] transition-all duration-200 shadow-lg flex items-center gap-2 hover:scale-105"
            onClick={() => setIsCreateModelOpen(true)}
          >
            <Plus className="w-5 h-5" />
            Create Playlist
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-6 mb-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium mb-2 text-gray-300">Search Problems</label>
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full px-4 py-3 mt-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] focus:border-transparent backdrop-blur-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium mb-2 text-gray-300">Difficulty</label>
            <select
              className="w-full px-4 py-3 mt-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] focus:border-transparent backdrop-blur-sm"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="ALL" className="bg-gray-800">All Difficulties</option>
              {difficulties.map((diff) => (
                <option key={diff} value={diff} className="bg-gray-800">
                  {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium mb-2 text-gray-300">Tags</label>
            <select
              className="w-full px-4 py-3 bg-white/10 mt-2 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] focus:border-transparent backdrop-blur-sm"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="ALL" className="bg-gray-800">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag} className="bg-gray-800">
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10 backdrop-blur-sm">
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Solved</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Tags</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Difficulty</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {paginatedProblems.length > 0 ? (
                paginatedProblems.map((problem) => {
                  const isSolved = problem.solvedBy.some((user) => user.userId === authUser?.id);
                  return (
                    <tr key={problem.id} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isSolved}
                            readOnly
                            className="w-5 h-5 text-[#4FD1C5] bg-white/10 border-white/20 rounded focus:ring-[#4FD1C5] focus:ring-2"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link 
                          to={`/problem/${problem.id}`} 
                          className="font-semibold text-white hover:text-[#4FD1C5] transition-colors duration-200 hover:underline"
                        >
                          {problem.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {(problem.tags || []).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-xs font-medium bg-[#C2410C] text-white rounded-full shadow-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            problem.difficulty === "EASY"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : problem.difficulty === "MEDIUM"
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {authUser?.role === "ADMIN" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDelete(problem.id)}
                                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-200 border border-red-500/30"
                              >
                                {isDeletingProblem ? (
                                  <Loader2 className='animate-spin h-4 w-4' />
                                ) : (
                                  <TrashIcon className="w-4 h-4" />
                                )}
                              </button>
                              <Link 
                                to={`/edit-problem/${problem.id}`} 
                                className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors duration-200 border border-yellow-500/30 inline-flex items-center"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </Link>
                            </div>
                          )}
                          <button
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 border border-white/20"
                            onClick={() => handleAddToPlaylist(problem.id)}
                          >
                            <Bookmark className="w-4 h-4" />
                            <span className="hidden sm:inline text-sm">Save to Playlist</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="text-gray-400">
                      <div className="text-lg font-medium mb-2">No problems found</div>
                      <div className="text-sm">Try adjusting your search criteria</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white/5 px-6 py-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-300">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredProblems.length)} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredProblems.length)} of {filteredProblems.length} results
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-[#4FD1C5]/20 text-[#4FD1C5] rounded-lg border border-[#4FD1C5]/30 font-medium">
                {currentPage} / {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

    <Suspense fallback={<div className="text-gray-400 text-sm">Loading...</div>}>
      <CreatePlaylistModal 
        isOpen={isCreateModelOpen} 
        onClose={() => setIsCreateModelOpen(false)} 
        onSubmit={handleCreatePlaylist} 
      />
      </Suspense>
    <Suspense fallback={<div className="text-gray-400 text-sm">Loading...</div>}>
         <AddToPlaylist 
            isOpen={isAddToPlaylistModelOpen} 
            onClose={() => setIsAddToPlaylistModelOpen(false)} 
            problemId={idToAdd} 
          />
    </Suspense>  
     
    </div>
  )
}

export default ProblemTable