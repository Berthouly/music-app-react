import React from 'react';
import "./Favorites.css";

import { useMusic } from '../../context/MusicContext';


const Favorites = () => {
  
  const {favorites} = useMusic();
    return (
    <div className="favoris">
        <h1>❤️Like</h1>

        {favorites.map((track) => (
            <div key={track.id}>
                <div>{track.title}</div>
                <div>{track.artist.name}</div>
                <div><img src={track.album.cover_medium} alt={track.title} /></div>
            </div>
        ))}
    </div>
  );
};
export default Favorites;
