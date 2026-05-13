import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMusic } from "../../context/MusicContext";
import { GoHome } from "react-icons/go";
import { TbLibraryPlus } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlinePersonAdd } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";


import "./Sidebar.css";


const Sidebar = () => {

  const { clearCurrentTrack } = useMusic();

    const { isLogged, logout } = useAuth();

    const naviguate = useNavigate();

    const handleLogout = () => {
        clearCurrentTrack();
        logout();
        naviguate("/login");
};

  return (

    <div className="sidebar">

      <Link to="/">
        <GoHome />
      </Link>
      <Link to="/search">
        <IoSearch />
      </Link>
      {isLogged && <Link to="/playlists"><TbLibraryPlus /></Link>}
      {isLogged && <Link to="/favorites"><CiHeart /></Link>}

      {!isLogged ? (
        <>
        <Link to="/login"><IoPersonCircleSharp /></Link>
         <Link to="/register"><MdOutlinePersonAdd /></Link>
        </>
      ) : (
        <button onClick={handleLogout}><IoLogOutOutline /></button>
      )}

    </div>
  );
};

export default Sidebar;