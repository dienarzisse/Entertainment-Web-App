import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
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
import { LazyLoadImage } from "react-lazy-load-image-component";

const Content = ({ id, imgSrc, year, name, mediaType, adult, rating }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${mediaType}/${id}`);
    window.scrollTo(0, 0);
  };
  const [ref, inView] = useInView({
    triggerOnce: true, // Load content only once when it becomes visible
  });

  return (
    <div className="Content" ref={ref}>
      {inView && (
        <>
          <LazyLoadImage
          effect="blur"
            src={
              imgSrc
                ? `https://image.tmdb.org/t/p/original${imgSrc}`
                : ContentCover
            }
            alt="movie"
            className="Background"
            draggable="false"
            onClick={handleClick}
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
        </>
      )}
    </div>
  );
};

export default Content;
