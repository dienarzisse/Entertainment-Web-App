import "./styling/css/Content.css";
import { useState } from "react";
import { MEDIA_TYPES } from "../Constants";
import MovieIcon from "../assets/icon-category-movie.svg";
import TVIcon from "../assets/icon-category-tv.svg";
import BookmarkEmptyIcon from "../assets/icon-bookmark-empty.svg";
import BookmarkFullIcon from "../assets/icon-bookmark-full.svg";
function Content({ imgSrc, year, name, type, age }) {
  const [bookmarked, setBookmarked] = useState(false);
  const handleToggleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  return (
    <div className="Content">
      <img
        src={imgSrc}
        alt="movie"
        className="Background"
        draggable="false"
      ></img>
      <div className="Details">
        <div className="Year">{year}</div>
        <div className="Oval"></div>
        <div className="Type">
          {type === MEDIA_TYPES.MOVIE ? (
            <img src={MovieIcon} alt="movie"></img>
          ) : (
            <img src={TVIcon} alt="movie"></img>
          )}
          <p>{type}</p>
        </div>
        <div className="Oval"></div>
        <div className="Age">
          <p>{age}</p>
        </div>
      </div>
      <div className="Name">{name}</div>
      <div className="BookmarkContainer" onClick={handleToggleBookmark}>
        <img
          src={bookmarked ? BookmarkFullIcon : BookmarkEmptyIcon}
          alt="bookmark"
          className="Bookmark"
        ></img>
      </div>
    </div>
  );
}
export default Content;
