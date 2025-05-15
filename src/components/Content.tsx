import React, { useState, KeyboardEvent, MouseEvent } from "react";
import { useInView } from "react-intersection-observer";
import { MEDIA_TYPES } from "../helpers/Constants";
import MovieIcon from "../assets/icon-category-movie.svg";
import TVIcon from "../assets/icon-category-tv.svg";
import BookmarkEmptyIcon from "../assets/icon-bookmark-empty.svg";
import BookmarkFullIcon from "../assets/icon-bookmark-full.svg";
import { useNavigate } from "react-router-dom";
import Stars from "react-stars";
import { RoundStars } from "../helpers/HelperFunctions";
import "./styling/css/Content.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// TODO If no image is available
const placeholderImage =
  "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg";

interface ContentProps {
  id: number | string;
  imgSrc: string | null;
  year: string | number;
  name: string;
  mediaType: string;
  adult: boolean;
  rating: number;
}

const Content: React.FC<ContentProps> = ({
  id,
  imgSrc,
  year,
  name,
  mediaType,
  adult,
  rating,
}) => {
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

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const toggleBookmark = (
    e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setBookmarked((prev) => !prev);
  };

  const handleBookmarkKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleBookmark(e);
    }
  };

  return (
    <div
      className="Content"
      ref={ref}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyPress}
      aria-label={`View details for ${name}`}
    >
      {inView && (
        <>
          <div className="ImageWrapper">
            <LazyLoadImage
              src={imageUrl}
              alt={name}
              effect="blur"
              placeholderSrc={placeholderImage}
              className="Background"
              draggable={false}
              loading="lazy"
              onError={(e: ErrorEvent) => {
                (e.target as HTMLImageElement).src = placeholderImage;
              }}
            />
          </div>

          <div className="Details">
            <div className="Year-Type-Wrapper">
              <div className="Year">{year}</div>
              <div className="Oval" />
              <div className="Type">
                <LazyLoadImage
                  src={mediaType === MEDIA_TYPES.MOVIE ? MovieIcon : TVIcon}
                  alt={mediaType === MEDIA_TYPES.MOVIE ? "Movie" : "TV Series"}
                  loading="lazy"
                  draggable={false}
                />
                <p>{mediaType}</p>
              </div>
            </div>

            <div className="Age">
              <p>{adult ? "18+" : "PG"}</p>
            </div>
          </div>

          <div className="Name">{name}</div>

          <div className="Rating">
            <Stars
              count={5}
              value={RoundStars(rating)}
              size={16}
              color1="#999"
              color2="#ffd700"
              half={true}
              edit={false}
            />
          </div>

          <div
            className="BookmarkContainer"
            onClick={toggleBookmark}
            role="button"
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
            tabIndex={0}
            onKeyDown={handleBookmarkKeyPress}
          >
            <LazyLoadImage
              src={bookmarked ? BookmarkFullIcon : BookmarkEmptyIcon}
              alt="bookmark icon"
              className="Bookmark"
              draggable={false}
              loading="lazy"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Content;
