// Styles
import "@styling/NavBar.css";

// React & Routing
import React from "react";
import { NavLink } from "react-router-dom";

// Assets
import Logo from "@assets/logo.svg";
import HomeIcon from "@assets/icon-nav-home.svg";
import MovieNavIcon from "@assets/icon-nav-movies.svg";
import TVNavIcon from "@assets/icon-nav-tv-series.svg";
import Avatar from "@assets/image-avatar.png";

// Components / Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const NavBar: React.FC = () => {
  return (
    <nav className="NavBar">
      {/* Logo always links home */}
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "Logo NavSelected" : "Logo")}
        aria-label="Go to Home"
      >
        <img src={Logo} alt="logo" />
      </NavLink>

      <div className="CenterNavGroup">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "NavSelected" : "")}
          aria-label="Go to Home"
        >
          <LazyLoadImage src={HomeIcon} alt="Home" />
        </NavLink>

        <NavLink
          to="/movie/genres"
          className={({ isActive }) =>
            isActive || window.location.pathname.startsWith("/movie")
              ? "NavSelected"
              : ""
          }
          aria-label="Go to Movies"
        >
          <LazyLoadImage src={MovieNavIcon} alt="Movies" />
        </NavLink>

        <NavLink
          to="/tv/genres"
          className={({ isActive }) =>
            isActive || window.location.pathname.startsWith("/tv")
              ? "NavSelected"
              : ""
          }
          aria-label="Go to TV Series"
        >
          <LazyLoadImage src={TVNavIcon} alt="TV Series" />
        </NavLink>
      </div>

      <LazyLoadImage src={Avatar} alt="User Avatar" className="Avatar" />
    </nav>
  );
};

export default NavBar;
