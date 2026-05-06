import React, { useState } from 'react'
import "./Track.css"
import axios from "axios"

const Track = () => {
    const [query, setQuery] = useState("");
    const [tracks, setTracks] = useState([]);

    const search = async () => {
        const res = await axios.get(`http://localhost:3000/api/deezer/${query}`);
        setTracks(res.data.data);
    };

  return (
    <div className="conteneur-tracks">
        <h2 className="title">Tracks</h2>

        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Rechercher...' />
        <button onClick={search}>Rechercher</button>

        <div className="tracks">
        {tracks.map((track) => (
            <div key={track.id}>
                <p>{track.title} - {track.artist.name}</p>
            <audio controls src={track.preview}></audio>  
  </div>
))}
        </div>
    </div>
  );
}

export default Track
