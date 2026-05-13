import React, { useEffect, useState } from "react";
import "./Track.css";

import { searchTracks } from "../../services/api.js";
import { useMusic } from "../../context/MusicContext.jsx";
import {
  getPlaylists,
  addTrackToPlaylist,
} from "../../services/playlist.js";
import { addFavoriteTrack } from "../../services/favorites.js";

import PageTransition from "../../components/PageTransition/PageTransition";

const Track = () => {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { setCurrentTrack, addHistory } = useMusic();

  const search = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await searchTracks(query);
      setTracks(res.data.data);
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
      <PageTransition
        subtitle="Découverte musicale"
        title="Recherche"
      />

      <div className="track-page">
        <section className="track-hero">
          <div className="track-hero-content">
            <p className="track-kicker">
              // Découverte musicale
            </p>

            <h1>
              Trouvez vos <em>artistes</em> préférés
            </h1>

            {/* Search bar gardée avec overlay */}
            <div className={`search-overlay ${isSearchFocused ? "active" : ""}`}>
              <div className="search-box">
                <button
                  className="close-search"
                  onClick={() => setIsSearchFocused(false)}
                >
                  ✕
                </button>

                <p>Recherche musicale</p>

                <h2>Trouver un titre</h2>

                <input
                  value={query}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Artiste, titre..."
                />

                <button onClick={search}>
                  Écouter
                </button>
              </div>
            </div>

            {loading && <p className="track-message">Chargement...</p>}
            {error && <p className="track-message error">{error}</p>}
          </div>

          <div className="vinyl-wrapper">
            <div className="turntable-arm"></div>

            <div className="vinyl-disc">
              <div className="vinyl-label">
                <span>Music</span>
                <strong>App</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="track-results">
          <p className="results-label">
            Résultats — {tracks.length} titres
          </p>

          <div className="track-list">
            {tracks.map((track, index) => (
              <div key={track.id} className="track-row">
                <span className="track-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <img
                  src={track.album.cover_small || track.album.cover_medium}
                  alt={track.title}
                />

                <div className="track-row-info">
                  <h3>{track.title}</h3>
                  <p>{track.artist.name}</p>
                </div>

                <span className="track-duration">
                  {track.duration
                    ? `${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, "0")}`
                    : "--:--"}
                </span>

                <div className="track-row-actions">
                  <button onClick={() => playTrack(track)}>
                    ▶
                  </button>

                  <button onClick={() => handleFavorite(track)}>
                    ♡
                  </button>

                  <select
                    defaultValue=""
                    onChange={(e) =>
                      handleAddToPlaylist(e.target.value, track)
                    }
                  >
                    <option value="" disabled>
                      +
                    </option>

                    {playlists.map((playlist) => (
                      <option key={playlist._id} value={playlist._id}>
                        {playlist.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Track;