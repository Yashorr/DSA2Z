import { db } from "../libs/db.js";

export const getAllPlaylists = async (req,res) =>{
     try {
        const playlists = await db.playlist.findMany({
            where: {
                userId : req.user.id
            },
            include: {
                problems : {
                    include: {
                        problem: true
                    }
                }
            }
        })

        res.status(200).json({
            success : true,
            message: "Playlist details fetched successfully",
            playlists: playlists
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success : false,
            message: "Error fetching playlist details",
        })
        
    }
   

}
export const getPlaylistDetails = async (req,res) =>{
    try {
        const playlistId = req.params.playlistId;
        const playlist = await db.playlist.findUnique({
            where: {
                id: playlistId,
                userId : req.user.id
            },
            include: {
                problems : {
                    include: {
                        problem: true
                    }
                }
            }
        })
        
        if(!playlist){
            return res.status(404).json({
                success : false,
                message: "Playlist not found",
            })
        }

        res.status(200).json({
            success : true,
            message: "Playlist details fetched successfully",
            playlist: playlist
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success : false,
            message: "Error fetching playlist details",
        })
        
    }
   

}
export const createPlaylist = async (req,res) =>{
     try {
        const {name,description} = req.body;

        const user= req.user.id;

        const playlist = await db.playlist.create({
            data : {
                name,
                description,
                userId: user,
            }
        })
        res.status(200).json({
            success : true,
            message: "Playlist created successfully",
            playlist: playlist
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success : false,
            message: "Error creating playlist",
        })
        
    }

}

export const addProblemToPlaylist = async (req,res) =>{
    try {
        const playlistId = req.params.playlistId;
        const {problemId} = req.body;

        if(!Array.isArray(problemId) || problemId.length === 0){
            return res.status(400).json({
                success : false,
                message: "Problem id is required",
            })
        }

        const problemsInPlaylist = await db.problemInPlaylist.createMany({
            data : problemId.map((id) =>
                ({playlistId,problemId:id}))
        })
        res.status(200).json({
            success : true,
            message: "Problem added to playlist successfully",
            problemsInPlaylist: problemsInPlaylist
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success : false,
            message: "Error adding problem to playlist",
        })
    }

}
export const  deletePlaylist = async (req,res) =>{
    try {
        const playlistId = req.params.playlistId;
        const playlist = await db.playlist.delete({
            where : {
                id : playlistId
            }
        })
        res.status(200).json({
            success : true,
            message: "Playlist deleted successfully",
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success : false,
            message: "Error deleting playlist",
        })
        
    }

}
export const removeProblemFromPlaylist = async (req,res) =>{
    try {
        const playlistId = req.params.playlistId;
        const {problemIds} = req.body;
        const problemsInPlaylist = await db.problemInPlaylist.deleteMany({
            where : {
                playlistId ,
                problemId : {
                    in : problemIds
                }
            }
        })
        res.status(200).json({
            success : true,
            message: "Problem removed from playlist successfully",
            })

                
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success : false,
            message: "Error removing problem from playlist",

        })
        
    }
}