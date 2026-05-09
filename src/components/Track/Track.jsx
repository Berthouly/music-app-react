import React, { useState } from 'react'
import "./Track.css"
import axios from "axios"
import {searchTracks} from "../../services/api.js";
import { useMusic } from "../../context/MusicContext.jsx";
import AlbumCard from '../AlbumCard/AlbumCard.jsx';

// Cette fonction permettra de changer la musique en cours
const Track = () => {

// Stocke ce que l'utilisateur tape dans l'input
    const [query, setQuery] = useState("");

// 🎵Tableau contenant les tracks récupérées depuis Deezer
    const [tracks, setTracks] = useState([]);

//  Permet d'afficher "Chargement..."
    const [loading, setLoading] = useState(false);
// Stocke les erreurs éventuelles
    const [error, setError] = useState("");

    const {
        setCurrentTrack, addFavorite, addHistory
    } = useMusic();

// Focntion appelé quand on clique sur "Rechercher"
    const search = async () => {
// Active le Loading
        setLoading(true);
//Rénitialise les erreurs
        setError("");

        try {
            //Appel API vers Backend
            // Appel API via api.js et query = texte tapé par l'utilisateur 
      const res = await searchTracks(query);
            // res.data = données renvoyées par ton serveur
            // res.data.data = tableau des tracks Deezer
            setTracks(res.data.data);

        } catch (err) {
            //si erreur reseaux API
            setError("Erreur lors de la récupération des tracks");
            console.log("err");
        } finally {
            //Stoppe le loading dans tous les cas
            setLoading(false);
        }
       
    };

    //Lecture track
    const playTrack = (track) => {
        setCurrentTrack(track);
        addHistory(track);
    };

  return (
    <div className="conteneur-tracks">
        <h2 className="title">Tracks</h2>

        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Rechercher...' />
        <button onClick={search}>Rechercher</button>
        { loading && <p>Chargement...</p> }
        { error && <p>{error}</p> }

        <div className="tracks-grid">
        {/* map() parcourt toutes les tracks */}
        {tracks.map((track) => (
           <AlbumCard key={track.id} track={track} onPlay={() => playTrack(track)} onFavorite={() => addFavorite(track)}/>
))}
        </div>
    </div>
  );
};

export default Track
