import React from 'react';
import "./AlbumCard.css";
import { FaPlay } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";


const AlbumCard = ({track, onPlay, onFavorite,}) => {
  return (
    <div className="album-card">
        <img src={track.album.cover_medium}  alt={track.title} />
        <div className="album-info">
            <h3>{track.title}</h3>
            <p>{track.artist.name}</p>
        </div>
        <div className="album-action">
            <button onClick={onPlay}><FaPlay /></button>
            <button onClick={onFavorite}><CiHeart /></button>
        </div>
    </div>
  );
};

export default AlbumCard
