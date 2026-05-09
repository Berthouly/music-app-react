import mongoose from "mongoose";


const playlistSchema = new mongoose.Schema({

  //Nom playlist
  name: {
    type: String,
    required: true,
  },


  // propriétaire playlist
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },


  //Musiques playlist
  tracks: [Object],

});


export default mongoose.model("Playlist", playlistSchema);