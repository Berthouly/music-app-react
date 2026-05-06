import React from 'react';
import "./CardArtiste.css";
import { useEffect, useState } from 'react';

const CardArtistes = () => {
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    fetch("https://www.theaudiodb.com/api/v1/json/123/search.php?s=coldplay").then(res => res.json()).then(data => {
        setArtist(data.artists[0]);
    });
  });
  return (
    <div>
      <h1>Mon app musique 🎵</h1>

      {artist && (
        <div className='card-artist'>
          <h2>{artist.strArtist}</h2>
          <p>{artist.strGenre}</p>
          <img src={artist.strArtistThumb} alt="" width="200" />
        </div>
      )}
    </div>
  );
}


export default CardArtistes
