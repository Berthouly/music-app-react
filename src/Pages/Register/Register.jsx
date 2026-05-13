import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Alert from "../../components/Alert/Alert";
import PageTransition from "../../components/PageTransition/PageTransition";


import "./../Login/Auth.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    setAlert({ type: "", message: "" });

    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });

      setAlert({
        type: "success",
        message: "Compte créé avec succès !",
      });

      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (err) {
      setAlert({
        type: "error",
        message: "Erreur lors de la création du compte.",
      });

      console.error(err);
    }
  };

  return (

    <>
    <PageTransition
  subtitle="Espace nouveaux utilisateurs"
  title="Inscription"
/>
    <div className="auth-page">
      <div className="auth-card">
        <h1>Inscription</h1>

        <p className="auth-subtitle">
          Crée ton espace pour sauvegarder tes favoris et composer tes
          playlists.
        </p>

        <input
          type="text"
          placeholder="Nom utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button onClick={handleRegister}>
          S’inscrire
        </button>

        <Alert type={alert.type} message={alert.message} />

        <p className="auth-legal">
          En t’inscrivant, tu acceptes nos conditions.
          <strong>Politique de confidentialité</strong>
        </p>

        <p className="auth-bottom">
          Déjà un compte ?
          <Link to="/login">Connexion</Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Register;