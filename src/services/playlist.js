import axios from "axios";



/*
Créer playlist
*/

export const createPlaylist = async (name) => {

  //  Récupère le token ACTUEL
  const token = localStorage.getItem("token");

  return await axios.post(

    "http://localhost:3000/api/playlists/create",

    {
      name,
    },

    {
      headers: {
        authorization: token,
      },
    }
  );
};




/*
Récupérer playlists
*/

export const getPlaylists = async () => {

  //  Token actuel
  const token = localStorage.getItem("token");

  return await axios.get(

    "http://localhost:3000/api/playlists/my-playlists",

    {
      headers: {
        authorization: token,
      },
    }
  );
};




/*
 Ajouter track playlist
*/

export const addTrackToPlaylist = async (

  playlistId,
  track

) => {

  //  Token actuel
  const token = localStorage.getItem("token");

  return await axios.post(

    "http://localhost:3000/api/playlists/add-track",

    {
      playlistId,
      track,
    },

    {
      headers: {
        authorization: token,
      },
    }
  );
};