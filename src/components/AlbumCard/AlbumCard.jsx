import "./AlbumCard.css";
import { FaPlay } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const AlbumCard = ({
  track,
  onPlay,
  onFavorite,
  playlists = [],
  onAddToPlaylist,
}) => {
  return (
    <article className="album-card">
      <div className="album-cover">
        <img
          src={track.album.cover_medium}
          alt={track.title}
        />

        <div className="album-overlay">
          <button onClick={onPlay}><FaPlay /></button>
          <button onClick={onFavorite}><CiHeart /></button>

          <select
            defaultValue=""
            onChange={(e) => onAddToPlaylist(e.target.value)}
          >
            <option value="" disabled>
              Playlist
            </option>

            {playlists.map((playlist) => (
              <option key={playlist._id} value={playlist._id}>
                {playlist.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="album-info">
        <h3>{track.title}</h3>
        <p>{track.artist.name}</p>
      </div>
    </article>
  );
};

export default AlbumCard;