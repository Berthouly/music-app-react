import React from 'react';
import "./AlbumCard.css";

const AlbumCard = ({track, onPlay, onFavorite,}) => {
  return (
    <div className="album-card">
        <img src={track.album.cover_medium}  alt={track.title} />
        <div className="album-info">
            <h3>{track.title}</h3>
            <p>{track.artist.name}</p>
        </div>
        <div className="album-action">
            <button onClick={onPlay}>▶️</button>
            <button onClick={onFavorite}>❤️</button>
        </div>
    </div>
  );
};

export default AlbumCard
