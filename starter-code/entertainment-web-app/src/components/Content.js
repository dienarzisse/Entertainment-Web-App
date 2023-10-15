import React, { useState } from "react";
import { MEDIA_TYPES } from "../Constants";
import MovieIcon from "../assets/icon-category-movie.svg";
import TVIcon from "../assets/icon-category-tv.svg";
import BookmarkEmptyIcon from "../assets/icon-bookmark-empty.svg";
import BookmarkFullIcon from "../assets/icon-bookmark-full.svg";
import { useNavigate } from "react-router-dom";
import Stars from "react-stars";
import { RoundStars } from "../HelperFunctions";
import "./styling/css/Content.css";
import ContentCover from "../assets/icon-unknown-content-cover.svg";

const Content = ({ id, imgSrc, year, name, mediaType, adult, rating }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${mediaType}/${id}`);
    window.scrollTo(0, 0);
  };
  const handleLowResLoad = () => {
    const highResImage = new Image();
    highResImage.src = `https://image.tmdb.org/t/p/original${imgSrc}`;
    highResImage.onload = handleHighResLoad;
  };
  const handleHighResLoad = () => {
    setImageLoaded(true);
  };
const allParamsAvailable = id && imgSrc && year && name && mediaType && rating;

if (!allParamsAvailable) {
  return null;
}
  return (
    <div className="Content">
      <img
        src={imgSrc ? `https://image.tmdb.org/t/p/w200${imgSrc}` : ContentCover}
        alt="content"
        className={`Background ${imageLoaded ? "loaded" : "loading"}`}
        draggable="false"
        onClick={handleClick}
        onLoad={handleLowResLoad}
      />
      <div className="Details">
        <div className="Year-Type-Wrapper">
          <div className="Year">{year}</div>
          <div className="Oval" />
          <div className="Type">
            <img
              src={mediaType === MEDIA_TYPES.MOVIE ? MovieIcon : TVIcon}
              alt="media type"
            />
            <p>{mediaType}</p>
          </div>
        </div>
        <div className="Age">
          <p>{adult ? "18+" : "PG"}</p>
        </div>
      </div>
      <div className="Name" onClick={handleClick}>
        {name}
      </div>
      <div className="Rating">
        <Stars
          count={5}
          value={RoundStars(rating)}
          size={16}
          color1={"#999"} // Unselected star color
          color2={"#ffd700"} // Selected star color
          half={true} // Enable half stars
          edit={false}
        />
      </div>
      <div
        className="BookmarkContainer"
        onClick={() => setBookmarked(!bookmarked)}
      >
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
