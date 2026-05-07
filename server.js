import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());

// 🔎 Route Deezer
app.get("/api/deezer/:query", async (req, res) => {

  try {

    // 📡 Appel API Deezer
    const response = await fetch(
      `https://api.deezer.com/search?q=${req.params.query}`
    );

    // 📦 Conversion JSON
    const data = await response.json();

    // ✅ Envoie les données au frontend React
    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Erreur serveur Deezer"
    });
  }
});


// 🚀 Lancement serveur
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
