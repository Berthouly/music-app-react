import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Ajouter un favori
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { track } = req.body;

    const user = await User.findById(req.user.id);

    const alreadyExists = user.favorites.some(
      (favorite) => favorite.id === track.id
    );

    if (!alreadyExists) {
      user.favorites.push(track);
      await user.save();
    }

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer les favoris
router.get("/my-favorites", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un favori
router.delete("/remove/:trackId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favorites = user.favorites.filter(
      (track) => track.id !== Number(req.params.trackId)
    );

    await user.save();

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;