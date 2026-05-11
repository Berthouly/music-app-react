import React, { useEffect, useState } from "react";
import {
  createPlaylist,
  getPlaylists,
} from "../../services/playlist.js";
import { FaPlay } from "react-icons/fa";
import PageTransition from "../../components/PageTransition/PageTransition";


import { useMusic } from "../../context/MusicContext.jsx";

import "./Playlists.css";

const Playlists = () => {
  const [name, setName] = useState("");
  const [playlists, setPlaylists] = useState([]);

  // 🎵 Playlist actuellement ouverte
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // 🎧 Player global
  const { setCurrentTrack, addHistory } = useMusic();

  const loadPlaylists = async () => {
    try {
      const res = await getPlaylists();
      setPlaylists(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      await createPlaylist(name);
      setName("");
      loadPlaylists();
    } catch (err) {
      console.error(err);
    }
  };

  const openPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const closePlaylist = () => {
    setSelectedPlaylist(null);
  };

  const handlePlay = (track) => {
    setCurrentTrack(track);
    addHistory(track);
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  return (
<>
    <PageTransition
  subtitle="Tes collections"
  title="Playlists"
/>

    <div className="playlists-page">
      <h1>Mes Playlists</h1>

      {/* Création playlist */}
      <div className="playlist-create">
        <input
          type="text"
          placeholder="Nom Playlist"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleCreate}>
          Créer playlist
        </button>
      </div>

      {/* Si aucune playlist ouverte */}
      {!selectedPlaylist && (
        <div className="playlists-grid">
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="playlist-card"
              onClick={() => openPlaylist(playlist)}
            >
              <h3>{playlist.name}</h3>

              <p>
                {playlist.tracks.length} tracks
              </p>

              {playlist.tracks[0]?.album?.cover_medium && (
                <img
                  src={playlist.tracks[0].album.cover_medium}
                  alt={playlist.name}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Si une playlist est ouverte */}
      {selectedPlaylist && (
        <div className="playlist-detail">
          <button onClick={closePlaylist}>
            ← Retour aux playlists
          </button>

          <h2>{selectedPlaylist.name}</h2>

          <p>
            {selectedPlaylist.tracks.length} tracks
          </p>

          {selectedPlaylist.tracks.length === 0 && (
            <p>Cette playlist est vide.</p>
          )}

          {selectedPlaylist.tracks.map((track) => (
            <div key={track.id} className="playlist-track">
              <img
                src={track.album.cover_medium}
                alt={track.title}
              />

              <div>
                <h3>{track.title}</h3>
                <p>{track.artist.name}</p>
              </div>

              <button onClick={() => handlePlay(track)}>
                <FaPlay />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Playlists;