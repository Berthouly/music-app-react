import express from "express";
import Playlist from "../models/Playlist.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

//Créer Playlist
router.post("/create", authMiddleware, async (req, res) => {
    try{
        const playlist = new Playlist({
            name: req.body.name,
            userId: req.user.id,
            tracks: [],
        });

        await playlist.save()

        res.json(playlist);
    } catch(err) {
        res.status(500).json({erroe: err.message});
    }
});

//Récup playlists user
router.get("/my-playlists", authMiddleware, async (req, res) => {
    try{
        const playlists = await Playlist.find({
            userId: req.user.id,
        });

        res.json(playlists);

    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Ajouter Track dans playlist
router.post("/add-track", authMiddleware, async (req, res) => {
    try{
        const {
            playlistId,
            track,
        } = req.body;

        const playlist = await Playlist.findById(playlistId);

        //Ajout Musique
        playlist.tracks.push(track);

        //Sauvegarde
        await playlist.save();

        res.json(playlist);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;