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
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const placeholderImage = "https://via.placeholder.com/500x281?text=Loading...";

const Content = ({ id, imgSrc, year, name, mediaType, adult, rating }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true });

  const imageUrl = imgSrc
    ? `https://image.tmdb.org/t/p/w500${imgSrc}`
    : placeholderImage;

  const handleClick = () => {
    navigate(`/${mediaType}/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="Content" ref={ref}>
      {inView && (
        <>
          <div className="ImageWrapper" onClick={handleClick}>
            <LazyLoadImage
              src={imageUrl}
              alt={name}
              effect="blur"
              placeholderSrc={placeholderImage}
              className="Background"
              draggable="false"
            />
          </div>

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
              color1={"#999"}
              color2={"#ffd700"}
              half={true}
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
