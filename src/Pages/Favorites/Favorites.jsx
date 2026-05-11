import React, { useEffect, useState } from "react";
import {
  getFavorites,
  removeFavoriteTrack,
} from "../../services/favorites.js";
import { useMusic } from "../../context/MusicContext.jsx";
import "./Favorites.css"; 
import { FaPlay } from "react-icons/fa";
import PageTransition from "../../components/PageTransition/PageTransition";



const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const { setCurrentTrack, addHistory } = useMusic();

  const loadFavorites = async () => {
    try {
      const res = await getFavorites();
      setFavorites(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlay = (track) => {
    setCurrentTrack(track);
    addHistory(track);
  };

  const handleRemove = async (trackId) => {
    try {
      const res = await removeFavoriteTrack(trackId);
      setFavorites(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (

     <>
     <PageTransition
  subtitle="Titres sauvegardés"
  title="Favoris"
/>
    <div className="favorites-page">
      <h1>Mes favoris</h1>

      {favorites.length === 0 && (
        <p>Aucun favoris pour le moment.</p>
      )}

      {favorites.map((track) => (
        <div key={track.id} className="favorite-track">
          <img src={track.album.cover_small} alt={track.title} />

          <p>
            {track.title} - {track.artist.name}
          </p>

          <button onClick={() => handlePlay(track)}><FaPlay /></button>

          <button onClick={() => handleRemove(track.id)}>
            Supprimer
          </button>
        </div>
      ))}
    </div>
    </>
  );
};

export default Favorites;