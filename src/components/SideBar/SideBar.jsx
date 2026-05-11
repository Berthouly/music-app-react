import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./Sidebar.css";


const Sidebar = () => {

    const { isLogged, logout } = useAuth();

  return (

    <div className="sidebar">

      <Link to="/">
        🏠
      </Link>
      <Link to="/search">
        🔎
      </Link>
      {isLogged && <Link to="/playlists">🎵</Link>}
      {isLogged && <Link to="/favorites">❤️</Link>}

      {!isLogged ? (
        <>
        <Link to="/login">👤</Link>
         <Link to="/register">➕</Link>
        </>
      ) : (
        <button onClick={logout}>🚪</button>
      )}

    </div>
  );
};

export default Sidebar;