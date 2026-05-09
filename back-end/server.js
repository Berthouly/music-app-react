import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";

import playlistRoutes from "./routes/playlistRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

//Middleware JSON
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);

app.use("/api/playlists", playlistRoutes);

//Connnexion MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connecté");
})
.catch ((err) => {
  console.log(err);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

//  Route Deezer
app.get("/api/deezer/:query", async (req, res) => {

  try {

    //  Appel API Deezer
    const response = await fetch(
      `https://api.deezer.com/search?q=${req.params.query}`
    );

    //  Conversion JSON
    const data = await response.json();

    //  Envoie les données au frontend React
    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur Deezer"
    });
  }
});


// //  Lancement serveur
// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });
