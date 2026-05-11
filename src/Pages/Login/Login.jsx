import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/auth.js";

import Alert from "../../components/Alert/Alert";

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
    setAlert({
      type: "",
      message: "",
    });

    try {
      const res = await loginUser({
        email,
        password,
      });

      login(res.data.token);

      setAlert({
        type: "success",
        message: "Connexion réussie ! Redirection...",
      });

      setTimeout(() => {
        navigate("/playlists");
      }, 1000);

    } catch (err) {
      setAlert({
        type: "error",
        message: "Email ou mot de passe incorrect.",
      });

      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
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

        <Alert
          type={alert.type}
          message={alert.message}
        />
      </div>
    </div>
  );
};

export default Login;