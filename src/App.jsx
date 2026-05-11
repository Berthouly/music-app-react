import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from 'react';
import './App.css';

import Track from './components/Track/Track';
import Player from './components/Player/Player';
import Sidebar from "./components/Sidebar/Sidebar";
import Favorites from "./Pages/Favorites/Favorites";
import Playlists from "./Pages/Playlists/Playlists";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Search from "./pages/Search/Search";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import { MusicProvider } from "./context/MusicContext";
import { AuthProvider } from "./context/AuthContext";



import "./index.css";


function App() {
  const [CurrentTrack, setCurrentTrack] = useState(null);

  return (
    <AuthProvider>
    <MusicProvider>
    <BrowserRouter>


    <div className="app">
      <div className="content">

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/playlist" element={<Playlists />} />
            </Routes>

          </div>

        <Player />
        <Sidebar />


    </div>

    </BrowserRouter>
    </MusicProvider>
    </AuthProvider>
  );
}

export default App;
