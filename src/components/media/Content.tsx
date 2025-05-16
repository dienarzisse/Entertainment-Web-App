// Styles
import "react-lazy-load-image-component/src/effects/blur.css";
import "@styling/Content.css";

import React, { useState, KeyboardEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Stars from "react-stars";

// Helpers
import { MEDIA_TYPES } from "@helpers/Constants";
import { RoundStars } from "@helpers/HelperFunctions";

// Assets
import MovieIcon from "@assets/icon-category-movie.svg";
import TVIcon from "@assets/icon-category-tv.svg";
import BookmarkEmptyIcon from "@assets/icon-bookmark-empty.svg";
import BookmarkFullIcon from "@assets/icon-bookmark-full.svg";
import PlaceholderImage from "@assets/placeholder.jpeg";

interface ContentProps {
  id: number | string;
  imgSrc: string | null;
  year: string | number;
  name: string;
  mediaType: string;
  adult: boolean;
  rating: number;
  onImageLoad?: () => void; // callback when image loads
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true });

  const imageUrl = imgSrc
    ? `https://image.tmdb.org/t/p/w500${imgSrc}`
    : PlaceholderImage;

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
              wrapperProps={{
                style: { transitionDelay: "0.5s" },
              }}
              placeholder={<div className="ImagePlaceholder"></div>}
              className="Background"
              draggable={false}
              loading="lazy"
              onLoad={() => {
                setImageLoaded(true);
              }}
              onError={() => {
                setImageError(true);
              }}
            />
          </div>

          {/* Only render additional images after main image loaded */}
          {imageLoaded && !imageError && (
            <>
              <div className="Details">
                <div className="Year-Type-Wrapper">
                  <div className="Year">{year}</div>
                  <div className="Oval" />
                  <div className="Type">
                    <LazyLoadImage
                      src={mediaType === MEDIA_TYPES.MOVIE ? MovieIcon : TVIcon}
                      alt={
                        mediaType === MEDIA_TYPES.MOVIE ? "Movie" : "TV Series"
                      }
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
        </>
      )}
    </div>
  );
};

export default Content;
