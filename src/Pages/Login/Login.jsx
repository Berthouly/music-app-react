import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/auth.js";
import Alert from "../../components/Alert/Alert";
import PageTransition from "../../components/PageTransition/PageTransition";


import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setAlert({ type: "", message: "" });

    try {
      const res = await loginUser({ email, password });

      login(res.data.token);

      setAlert({
        type: "success",
        message: "Connexion réussie !",
      });

      setTimeout(() => {
        navigate("/playlists");
      }, 900);
    } catch (err) {
      setAlert({
        type: "error",
        message: "Email ou mot de passe incorrect.",
      });

      console.error(err);
    }
  };

  return (

      <>
    <PageTransition
  subtitle="Espace utilisateurs"
  title="Connexion"
/>
    <div className="auth-page">
      <div className="auth-card">
        <h1>Connexion</h1>

        <p className="auth-subtitle">
          Connecte-toi pour retrouver tes favoris, playlists et titres
          sauvegardés.
        </p>

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

        <Alert type={alert.type} message={alert.message} />

        <p className="auth-legal">
          En te connectant, tu acceptes nos conditions.
          <strong>Politique de confidentialité</strong>
        </p>

        <p className="auth-bottom">
          Pas encore de compte ?
          <Link to="/register">S’inscrire</Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;