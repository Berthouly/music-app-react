import { useRef, useState, useEffect } from "react";
import React from 'react';
import "./Player.css";
import { useMusic } from "../../context/MusicContext";
import { addFavoriteTrack } from "../../services/favorites.js";


const Player = ({onFavorite}) => {

  const { currentTrack, addFavorite } = useMusic();

  const audioRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(1);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);

  //Pause / Play

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  //progression
const handleTimeUpdate = () => {

  const current = audioRef.current.currentTime;

  const duration = audioRef.current.duration;

  if (!duration) return;

  setProgress((current / duration) * 100);
};

// Changement volume
const changeVolume = (e) => {

  // valeur du slider
  const value = e.target.value;

  // update React
  setVolume(value);

  // update volume audio HTML
  audioRef.current.volume = value;
};


  if (!currentTrack) return null;

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

    <div className="player">

      <img
        src={currentTrack.album.cover_small}
        alt={currentTrack.title}
      />


      <div className="player-info">
        <h4>{currentTrack.title}</h4>
        <p>{currentTrack.artist.name}</p>
      </div>


      {/* Controls */}
      <div className="player-controls">
        <button onClick={togglePlay}>
          {isPlaying ? "⏸️" : "▶️"}
        </button>

        <div className="like-btn">
          <button onClick={() => addFavoriteTrack(currentTrack)}>❤️</button>
        </div>


        {/* Barre progression */}
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>


      {/* Volume */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={changeVolume}
      />


      <audio ref={audioRef}
        src={currentTrack.preview}
        onTimeUpdate={handleTimeUpdate}
      />

    </div>
  );
};

export default Player;