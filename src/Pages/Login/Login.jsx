import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/auth.js";

const Login = () => {
  // Email tapé par l'utilisateur
  const [email, setEmail] = useState("");

  // Mot de passe tapé par l'utilisateur
  const [password, setPassword] = useState("");

  // Message d'erreur
  const [error, setError] = useState("");

  // Message de succès
  const [success, setSuccess] = useState("");

  // Fonction globale venant du AuthContext
  // Elle sauvegarde le token dans localStorage
  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    try {
      // Appel au backend : /api/auth/login
      const res = await loginUser({
        email,
        password,
      });

      // Sauvegarde du token via AuthContext
      login(res.data.token);

      setSuccess("Utilisateur connecté");

      console.log("Utilisateur connecté");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
      console.error(err);
    }
  };

  return (
    <div className="login-page">
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

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;