import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addProblemToPlaylist, createPlaylist, deletePlaylist, getAllPlaylists, getPlaylistDetails, removeProblemFromPlaylist } from "../controllers/playlist.controller.js";

const playlistRoutes = express.Router();

playlistRoutes.get("/",authMiddleware, getAllPlaylists);
playlistRoutes.get("/:playlistId", authMiddleware,getPlaylistDetails);
playlistRoutes.post("/create-playlist",authMiddleware, createPlaylist);
playlistRoutes.post("/:playlistId/add-problems",authMiddleware,addProblemToPlaylist);
playlistRoutes.delete("/:playlistId",authMiddleware,deletePlaylist);
playlistRoutes.delete("/:playlistId/remove-problem",authMiddleware , removeProblemFromPlaylist);

export default playlistRoutes;