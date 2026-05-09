import axios from "axios"; 

export const registerUser = async (data) => {
    return await axios.post("http://localhost:3000/api/auth/register", data);
};

export const loginUser = async (data) => {
    return await axios.post("http://localhost:3000/api/auth/login",
    data);
};