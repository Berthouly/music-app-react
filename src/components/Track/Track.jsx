import React, { useEffect, useState } from 'react'
import "./Track.css"
import axios from "axios"
import {searchTracks} from "../../services/api.js";
import { useMusic } from "../../context/MusicContext.jsx";
import AlbumCard from '../AlbumCard/AlbumCard.jsx';
import { getPlaylists, addTrackToPlaylist } from "../../services/playlist.js";
import { addFavoriteTrack } from "../../services/favorites.js";

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
      const [playlists, setPlaylists] = useState([]);


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

    const loadPlaylists = async () => {
    try {
      const res = await getPlaylists();
      setPlaylists(res.data);
    } catch (err) {
      console.error(err);
    }
  };


    //Lecture track
    const playTrack = (track) => {
        setCurrentTrack(track);
        addHistory(track);
    };

    const handleAddToPlaylist = async (playlistId, track) => {
        try {
            await addTrackToPlaylist(playlistId, track);
            alert("Track ajoutée à la playlist");
        } catch (err) {
            console.log(err);
            alert("Erreur lors de l'ajout");
        }
    };

    useEffect (() => {
        loadPlaylists();
    }, []);

    const handleFavorite = async (track) => {
  try {
    await addFavoriteTrack(track);
    alert("Track ajoutée aux favoris");
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l'ajout aux favoris");
  }
};

  return (
    <div className="conteneur-tracks">
        <h2 className="title">Tracks</h2>

        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Rechercher...' className='rechercher' />
        <button onClick={search} className='chercher'>Rechercher</button>
        { loading && <p>Chargement...</p> }
        { error && <p>{error}</p> }

        <div className="tracks-grid">
        {tracks.map((track) => (
          <div key={track.id}>
            <AlbumCard
              track={track}
              onPlay={() => playTrack(track)}
              onFavorite={() => handleFavorite(track)}
            />

            <select
              onChange={(e) =>
                handleAddToPlaylist(e.target.value, track)
              }
              defaultValue=""
            >
              <option value="" disabled>
                Ajouter à une playlist
              </option>

              {playlists.map((playlist) => (
                <option key={playlist._id} value={playlist._id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Track
