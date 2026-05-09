import React, { useState, useEffect } from 'react';
import { createPlaylist, getPlaylists } from '../../services/playlist';
import "./Playlists.css";

const Playlists = () => {

  //nom playlist
  const [name, setName] = useState("");
  //Liste playlist
  const [playlists, setPlaylists] = useState([]);

  //Charger les playlist

  const loadPlaylists = async () => {
    try {
      const res = await getPlaylists();
      setPlaylists(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  //Créé plyalist

  const handleCreate = async () => {
    try {
      await createPlaylist(name);
      setName("");
      loadPlaylists();

    } catch (err) {
      console.log(err);
    }
  };

  //au chargement 

  useEffect (() => {
    loadPlaylists();
  }, []);

  return (
    <div className="playlists">
        <h1>Mes Playlists</h1>
        <input type="text" placeholder='Nom Playlist' value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleCreate}>Créer playlist</button>

      {playlists.map((playlist) => (
        <div key={playlist._id}>
          <h3>{playlist.name}</h3>
          <p>
            {playlist.tracks.length} tracks
          </p>
        </div>
      ))}
    </div>
  );
};

export default Playlists;
