import React, { useState } from "react";

import { loginUser } from "../../services/auth.js";

const Login = () => {

  //Email utilisateur
  const [email, setEmail] = useState("");

  // Password utilisateur
  const [password, setPassword] = useState("");



  // 🔐 Fonction login
  const handleLogin = async () => {

    try {

      // Appel API backend
      const res = await loginUser({

        email,

        password

      });




      // Sauvegarde token navigateur
      localStorage.setItem(

        "token",

        res.data.token
      );



      console.log("Utilisateur connecté");

    } catch (err) {

      console.log(err);
    }
  };



  return (

    <div>

      <h1>Connexion</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />



      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />



      <button onClick={handleLogin}>
        Se connecter
      </button>

    </div>
  );
};

export default Login;