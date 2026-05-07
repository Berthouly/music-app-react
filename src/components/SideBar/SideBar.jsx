import { Link } from "react-router-dom";

import "./Sidebar.css";


const Sidebar = () => {

  return (

    <div className="sidebar">

      <Link to="/">
        🏠
      </Link>
      <Link to="/search">
        🔎
      </Link>
      <Link to="/favorites">
        ❤️
      </Link>
      <Link to="/playlists">
        🎵
      </Link>

    </div>
  );
};

export default Sidebar;