import React, { useState } from "react";
import { MEDIA_TYPES } from "../Constants";
import MovieIcon from "../assets/icon-category-movie.svg";
import TVIcon from "../assets/icon-category-tv.svg";
import BookmarkEmptyIcon from "../assets/icon-bookmark-empty.svg";
import BookmarkFullIcon from "../assets/icon-bookmark-full.svg";
import { useNavigate } from "react-router-dom";
import "./styling/css/Content.css";

const Content = ({ id, imgSrc, year, name, mediaType, adult }) => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleToggleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  const navigate = useNavigate();
  const mediaIcon = mediaType === MEDIA_TYPES.MOVIE ? MovieIcon : TVIcon;
  const ageRating = adult ? "18+" : "PG";
  const handleClick = () => {
    navigate(`/${mediaType}/${id}`);
  };
  return (
    <div className="Content">
      <img
        src={imgSrc}
        alt="movie"
        className="Background"
        draggable="false"
        onClick={handleClick}
      />
      <div className="Details">
        <div className="Year">{year}</div>
        <div className="Oval"></div>
        <div className="Type">
          <img src={mediaIcon} alt="media type" />
          <p>{mediaType}</p>
        </div>
        <div className="Oval"></div>
        <div className="Age">
          <p>{ageRating}</p>
        </div>
      </div>
      <div className="Name">{name}</div>
      <div className="BookmarkContainer" onClick={handleToggleBookmark}>
        <img
          src={bookmarked ? BookmarkFullIcon : BookmarkEmptyIcon}
          alt="bookmark"
          className="Bookmark"
        />
      </div>
    </div>
  );
};

export default Content;
