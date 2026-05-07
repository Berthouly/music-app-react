import { createContext, useContext, useState } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    //Track actuellement jouée
    const [currentTrack, setCurrentTrack] = useState(null);
    //Favoris
    const [favorites, setFavorites] = useState([]);
    //Historique
    const [history, setHistory] = useState([]);

    //Ajouter favoris => demander a chat plus d'explication
    const addFavorite = (track) => {
        setFavorites((prev) => [...prev, track]);
    };

    //Ajouter historique
    const addHistory = (track) => {
        setHistory((prev) => [track, ...prev]);
    };

    return (
        
        <MusicContext.Provider value={{currentTrack, setCurrentTrack, favorites, addFavorite, history, addHistory}} >
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => useContext(MusicContext);



//createContext() crée un “stockage global React”.

//On peut ensuite :

//sauvegarder une musique globale
//lire cette musique depuis n’importe quelle page
//garder le player actif pendant la navigation

// Comme Spotify.

//Le useContext permer de récup les données globale du COntext comme Player.jsx peut lire la musique acutelle, Favorites peut lire les favoris
//Le useRef permet de manipuler les balises HTML en JS comme audio qui devient audioRef.current.play
//useEffect lance du code automatiquement lorsque quelque chose change comme dès qu'une nouvelle track est séléctionné 