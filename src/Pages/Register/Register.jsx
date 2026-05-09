import React, { use, useState } from 'react'
import "./Register.css";
import axios from "axios";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/auth/register", {
                username, 
                email, 
                password,
            });

            console.log(res.data);
            alert("Utilisateur Créé");
        } catch (err) {
            console.log(err);
        }
    };


  return (
    <div className="register">
        <h1>Inscription</h1>

        <input type="text" placeholder="Nom d'Utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Créer un compte</button>
    </div>
  );
};

export default Register
