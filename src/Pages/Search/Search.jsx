import React from 'react'
import "./Search.css";
import Track from "../../components/Track/Track";

const Search = ({setCurrenttrack}) => {
  return (
    <div className="search">
        <Track setCurrentTrack={setCurrenttrack}/>
    </div>
  );
};

export default Search
