// Import Icons
import Logo from "../assets/logo.svg";
import HomeIcon from "../assets/icon-nav-home.svg";
import MovieNavIcon from "../assets/icon-nav-movies.svg";
import TVNavIcon from "../assets/icon-nav-tv-series.svg";
import BookmarkIcon from "../assets/icon-nav-bookmark.svg";
import Avatar from "../assets/image-avatar.png";
import './styling/css/NavBar.css';
function NavBar() {
  return (
    <nav className="NavBar">
      <img src={Logo} alt="logo" className="Logo"></img>
      <div className="CenterNavGroup"> 
      {/* deal with the right element having the "selected" class later*/}
        <img src={HomeIcon} alt="home nav icon" className="NavSelected"></img>
        <img src={MovieNavIcon} alt="movie nav icon"></img>
        <img src={TVNavIcon} alt="tv nav icon"></img>
        <img src={BookmarkIcon} alt="bookmark nav icon"></img>
      </div>
      <img src={Avatar} alt="avatar" className="Avatar"></img>
    </nav>
  );
}
export default NavBar;
