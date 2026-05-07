
import axios from "axios";

// Recherche tracks
export const searchTracks = async (query) => {
  return await axios.get(
    `http://localhost:3000/api/deezer/${query}`
  );
};