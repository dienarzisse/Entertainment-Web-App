// Import Icons
import Logo from "../assets/logo.svg";
import HomeIcon from "../assets/icon-nav-home.svg";
import MovieNavIcon from "../assets/icon-nav-movies.svg";
import TVNavIcon from "../assets/icon-nav-tv-series.svg";
import BookmarkIcon from "../assets/icon-nav-bookmark.svg";
import Avatar from "../assets/image-avatar.png";
import "./styling/css/NavBar.css";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate(`/`);
  };
  const handleClickMovies = () => {
    navigate(`/movie/genres`);
  };
  const handleClickTV = () => {
    navigate(`/tv/genres`);
  };

  return (
    <nav className="NavBar">
      <img
        src={Logo}
        alt="logo"
        className="Logo"
        onClick={handleClickHome}
      ></img>
      <div className="CenterNavGroup">
        {/* deal with the right element having the "selected" class later*/}
        <img
          src={HomeIcon}
          alt="home nav icon"
          className="NavSelected"
          onClick={handleClickHome}
        ></img>
        <img
          src={MovieNavIcon}
          alt="movie nav icon"
          onClick={handleClickMovies}
        ></img>
        <img
          src={TVNavIcon}
          alt="tv nav icon"
          onClick={handleClickTV}
        ></img>
        {/* <img src={BookmarkIcon} alt="bookmark nav icon"></img> */}
      </div>
      <img src={Avatar} alt="avatar" className="Avatar"></img>
    </nav>
  );
}
export default NavBar;
