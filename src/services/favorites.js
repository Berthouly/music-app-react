import axios from "axios";

export const addFavoriteTrack = async (track) => {
  const token = localStorage.getItem("token");

  return await axios.post(
    "http://localhost:3000/api/favorites/add",
    { track },
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const getFavorites = async () => {
  const token = localStorage.getItem("token");

  return await axios.get(
    "http://localhost:3000/api/favorites/my-favorites",
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const removeFavoriteTrack = async (trackId) => {
  const token = localStorage.getItem("token");

  return await axios.delete(
    `http://localhost:3000/api/favorites/remove/${trackId}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
};