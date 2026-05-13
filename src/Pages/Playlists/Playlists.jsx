import React, { useEffect, useState } from "react";
import {
  createPlaylist,
  getPlaylists,
  deletePlaylist,
  removeTrackFromPlaylist,
} from "../../services/playlist.js";

import { FaPlay } from "react-icons/fa";

import PageTransition from "../../components/PageTransition/PageTransition";

import { useMusic } from "../../context/MusicContext.jsx";

import "./Playlists.css";

const Playlists = () => {

  const [name, setName] = useState("");

  const [playlists, setPlaylists] = useState([]);

  // Playlist ouverte
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Overlay création playlist
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Player global
  const { setCurrentTrack, addHistory } = useMusic();



  /*
  Charger playlists
  */
  const loadPlaylists = async () => {

    try {

      const res = await getPlaylists();

      setPlaylists(res.data);

    } catch (err) {

      console.error(err);
    }
  };



  /*
  Créer playlist
  */
  const handleCreate = async () => {

    if (!name.trim()) return;

    try {

      await createPlaylist(name);

      setName("");

      setIsCreateOpen(false);

      loadPlaylists();

    } catch (err) {

      console.error(err);
    }
  };



  /*
  Ouvrir playlist
  */
  const openPlaylist = (playlist) => {

    setSelectedPlaylist(playlist);
  };



  /*
  Fermer playlist
  */
  const closePlaylist = () => {

    setSelectedPlaylist(null);
  };



  /*
  Lecture track
  */
  const handlePlay = (track) => {

    setCurrentTrack(track);

    addHistory(track);
  };



  /*
  Supprimer playlist
  */
  const handleDeletePlaylist = async (playlistId) => {

    try {

      await deletePlaylist(playlistId);

      setSelectedPlaylist(null);

      loadPlaylists();

    } catch (err) {

      console.error(err);
    }
  };



  /*
  Supprimer track playlist
  */
  const handleRemoveTrack = async (
    playlistId,
    trackId
  ) => {

    try {

      const res = await removeTrackFromPlaylist(
        playlistId,
        trackId
      );

      setSelectedPlaylist(res.data);

      loadPlaylists();

    } catch (err) {

      console.error(err);
    }
  };



  /*
  Chargement initial
  */
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

        {/* HEADER */}
        <div className="playlists-header">

          <div>

            <p className="playlists-kicker">
              Médiathèque
            </p>

            <h1>
              Mes playlists
            </h1>

          </div>



          {/* Bouton + */}
          <button
            className="playlist-add-icon"
            onClick={() => setIsCreateOpen(true)}
          >
            +
          </button>

        </div>



        {/* OVERLAY CREATION PLAYLIST */}
        <div className={`playlist-create-overlay ${isCreateOpen ? "active" : ""}`}>

          <div className="playlist-create-modal">

            {/* Fermer */}
            <button
              className="playlist-close"
              onClick={() => setIsCreateOpen(false)}
            >
              ✕
            </button>



            <p>
              Nouvelle playlist
            </p>

            <h2>
              Créer une collection
            </h2>



            <input
              type="text"
              placeholder="Nom de la playlist"
              value={name}
              autoFocus={isCreateOpen}
              onChange={(e) => setName(e.target.value)}
            />



            <button onClick={handleCreate}>
              Créer playlist
            </button>

          </div>

        </div>



        {/* LISTE PLAYLISTS */}
        {!selectedPlaylist && (

          <div className="playlists-list">

            {playlists.length === 0 && (

              <p className="empty-playlists">
                Aucune playlist pour le moment.
              </p>

            )}



            {playlists.map((playlist) => (

              <div
                key={playlist._id}
                className="playlist-row-wrapper"
              >

                {/* Card playlist */}
                <button
                  className="playlist-row"
                  onClick={() => openPlaylist(playlist)}
                >

                  {/* Cover */}
                  <div className="playlist-row-cover">

                    {playlist.tracks[0]?.album?.cover_medium ? (

                      <img
                        src={playlist.tracks[0].album.cover_medium}
                        alt={playlist.name}
                      />

                    ) : (

                      <span>♪</span>

                    )}

                  </div>



                  {/* Infos */}
                  <div className="playlist-row-info">

                    <h3>
                      {playlist.name}
                    </h3>

                    <p>
                      {playlist.tracks.length} titres
                    </p>

                  </div>



                  {/* Arrow */}
                  <span className="playlist-row-arrow">
                    ›
                  </span>

                </button>



                {/* Delete playlist */}
                <button
                  className="playlist-delete"
                  onClick={() =>
                    handleDeletePlaylist(playlist._id)
                  }
                >
                  🗑
                </button>

              </div>

            ))}

          </div>

        )}



        {/* DETAIL PLAYLIST */}
        {selectedPlaylist && (

          <div className="playlist-detail">

            {/* Retour */}
            <button
              className="playlist-back"
              onClick={closePlaylist}
            >
              ← Retour
            </button>



            {/* Header */}
            <div className="playlist-detail-header">

              {/* Cover */}
              <div className="playlist-detail-cover">

                {selectedPlaylist.tracks[0]?.album?.cover_medium ? (

                  <img
                    src={selectedPlaylist.tracks[0].album.cover_medium}
                    alt={selectedPlaylist.name}
                  />

                ) : (

                  <span>♪</span>

                )}

              </div>



              {/* Infos */}
              <div>

                <p className="playlists-kicker">
                  Playlist
                </p>

                <h2>
                  {selectedPlaylist.name}
                </h2>

                <p>
                  {selectedPlaylist.tracks.length} titres
                </p>

              </div>

            </div>



            {/* Delete playlist */}
            <button
              className="delete-playlist-detail"
              onClick={() =>
                handleDeletePlaylist(selectedPlaylist._id)
              }
            >
              Supprimer playlist
            </button>



            {/* Playlist vide */}
            {selectedPlaylist.tracks.length === 0 && (

              <p className="empty-playlists">
                Cette playlist est vide.
              </p>

            )}



            {/* Tracks */}
            <div className="playlist-tracks">

              {selectedPlaylist.tracks.map((track) => (

                <div
                  key={track.id}
                  className="playlist-track"
                >

                  {/* Cover */}
                  <img
                    src={track.album.cover_medium}
                    alt={track.title}
                  />



                  {/* Infos */}
                  <div>

                    <h3>
                      {track.title}
                    </h3>

                    <p>
                      {track.artist.name}
                    </p>

                  </div>



                  {/* Actions */}
                  <div className="playlist-track-actions">

                    {/* Play */}
                    <button
                      onClick={() => handlePlay(track)}
                    >
                      <FaPlay />
                    </button>



                    {/* Delete track */}
                    <button
                      onClick={() =>
                        handleRemoveTrack(
                          selectedPlaylist._id,
                          track.id
                        )
                      }
                    >
                      ✕
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>
    </>
  );
};

export default Playlists;