import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Alert from "../../components/Alert/Alert";
import PageTransition from "../../components/PageTransition/PageTransition";

import "../Login/Auth.css";

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
    setAlert({
      type: "",
      message: "",
    });

    try {
      await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      setAlert({
        type: "success",
        message: "Compte créé avec succès ! Redirection...",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);

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
  subtitle="Espace pour les nouveaux utilisateurs"
  title="Incription"
/>
    <div className="auth-page">
      <div className="auth-card">
        <h1>Inscription</h1>
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
        <button onClick={handleRegister}>Créer mon compte</button>
        <Alert type={alert.type} message={alert.message}/>
      </div>
    </div>
    </>
  );
};

export default Register;