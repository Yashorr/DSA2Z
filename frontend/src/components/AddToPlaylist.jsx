import React ,{useEffect, useState} from 'react'
import {X,Plus,Loader} from 'lucide-react'
import { usePlaylistStore } from '../store/usePlayListStore'


const AddToPlaylist = ({isOpen,onClose ,problemId}) => {
    const {playlists,isLoading,getAllPlaylists,addProblemToPlaylist} = usePlaylistStore()

    const [selectedPlaylist , setSelectedPlaylist] = useState("");

    useEffect(()=>{
        if(isOpen){
            getAllPlaylists()
           
            
        }

    },[isOpen])
    
    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!selectedPlaylist) return null ;

        console.log(selectedPlaylist , "selected playlist");
         console.log(problemId , "selected problem ");
         console.log(selectedPlaylist , [problemId])
        
        await addProblemToPlaylist(selectedPlaylist , [problemId]);
        onClose();
    }

    if(!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-[#4FD1C5] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="absolute bottom-16 right-0 w-1/3 h-1/3 bg-[#F97316] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-base-300">
          <h3 className="text-xl font-bold">Add to Playlist</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Select Playlist</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select a playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!selectedPlaylist || isLoading}
            >
              {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add to Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddToPlaylist