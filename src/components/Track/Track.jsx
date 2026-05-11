import React, { useEffect, useState } from "react";
import "./Track.css";

import { searchTracks } from "../../services/api.js";
import { useMusic } from "../../context/MusicContext.jsx";
import AlbumCard from "../AlbumCard/AlbumCard.jsx";
import PageTransition from "../../components/PageTransition/PageTransition";

import {
  getPlaylists,
  addTrackToPlaylist,
} from "../../services/playlist.js";

import { addFavoriteTrack } from "../../services/favorites.js";

const Track = () => {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Active/désactive l’overlay de recherche
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { setCurrentTrack, addHistory } = useMusic();

  const search = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await searchTracks(query);

      setTracks(res.data.data);

      // Ferme l’overlay après la recherche
      setIsSearchFocused(false);
    } catch (err) {
      setError("Erreur lors de la récupération des tracks");
      console.error(err);
    } finally {
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

  const playTrack = (track) => {
    setCurrentTrack(track);
    addHistory(track);
  };

  const handleAddToPlaylist = async (playlistId, track) => {
    try {
      await addTrackToPlaylist(playlistId, track);
      alert("Track ajoutée à la playlist");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout");
    }
  };

  const handleFavorite = async (track) => {
    try {
      await addFavoriteTrack(track);
      alert("Track ajoutée aux favoris");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout aux favoris");
    }
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  return (
    <>
     <PageTransition subtitle="Trouve ton son" title="Recherche"/>


    <div className="conteneur-tracks">
      <h2 className="title">Tracks</h2>

      {/* Recherche animée */}
      <div className={`search-overlay ${isSearchFocused ? "active" : ""}`}>
        <div className="search-box">
          <input
            value={query}
            onFocus={() => setIsSearchFocused(true)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher..."
          />

          <button onClick={search} className="searh-name">
            Rechercher
          </button>

          {isSearchFocused && (
            <button
              className="close-search"
              onClick={() => setIsSearchFocused(false)}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}

      <div className="tracks-grid">
        {tracks.map((track) => (
          <div key={track.id}>
            <AlbumCard
              track={track}
              onPlay={() => playTrack(track)}
              onFavorite={() => handleFavorite(track)}
            />

            <select
              defaultValue=""
              onChange={(e) =>
                handleAddToPlaylist(e.target.value, track)
              }
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
    </>
  );
};

export default Track;