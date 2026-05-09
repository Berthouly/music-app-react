import mongoose from "mongoose";

//Structure utilisateur
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email :{
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    favorites: [Object],

    history: [Object],
});

export default mongoose.model("User", userSchema);