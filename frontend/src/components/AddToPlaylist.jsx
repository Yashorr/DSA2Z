

import { useEffect, useState } from "react"
import { X, Plus, Loader } from "lucide-react"
import { usePlaylistStore } from "../store/usePlaylistStore"

const AddToPlaylist = ({ isOpen, onClose, problemId }) => {
  const { playlists, isLoading, getAllPlaylists, addProblemToPlaylist } = usePlaylistStore()
  const [selectedPlaylist, setSelectedPlaylist] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isOpen) {
      // Reset error state when modal opens
      setError(null)

      // Fetch playlists
       const fetchData = async () => {
      try {
        await getAllPlaylists()
      } catch (err) {
        console.error(err)
        setError("Failed to fetch playlists")
      }
    }

    fetchData();
  }}, [isOpen, getAllPlaylists])

  // Debug the playlists data
  console.log("Playlists data:", playlists)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedPlaylist) return null

    try {
      await addProblemToPlaylist(selectedPlaylist, [problemId])
      onClose()
    } catch (err) {
      console.error("Error adding problem to playlist:", err)
      setError("Failed to add problem to playlist")
    }
  }

  if (!isOpen) return null

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-base-100 rounded-lg shadow-xl p-8">
          <Loader className="size-10 animate-spin" />
        </div>
      </div>
    )
  }

  // Ensure playlists is an array before mapping
  const validPlaylists = Array.isArray(playlists) ? playlists : []

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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Select Playlist</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
            >
              <option value="">Select a playlist</option>
              {validPlaylists.length > 0 ? (
                validPlaylists.map((playlist) =>
                  playlist && playlist.id ? (
                    <option key={playlist.id} value={playlist.id}>
                      {playlist.name || "Unnamed playlist"}
                    </option>
                  ) : null,
                )
              ) : (
                <option value="" disabled>
                  No playlists available
                </option>
              )}
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={!selectedPlaylist || isLoading}>
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
