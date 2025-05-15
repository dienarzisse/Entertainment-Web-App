import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetLanguageName, FetchData, RoundStars } from "../HelperFunctions";
import Stars from "react-stars";
import IMDbIcon from "../assets/imdb-logo.svg";
import HomeIcon from "../assets/home-logo.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./styling/css/ContentDetails.css";

const placeholderImage = "https://via.placeholder.com/300x450?text=Loading...";

interface Genre {
  id: number;
  name: string;
}

interface MediaContentDetails {
  title?: string;
  name?: string;
  tagline?: string;
  vote_average?: number;
  homepage?: string;
  imdb_id?: string;
  runtime?: number;
  original_language?: string;
  release_date?: string;
  status?: string;
  genres?: Genre[];
  overview?: string;
  poster_path?: string;
}

function ContentDetails() {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const [mediaContentDetails, setMediaContentDetails] =
    useState<MediaContentDetails | null>(null);

  useEffect(() => {
    if (!mediaType || !id) return;

    const optionsDetails = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };

    FetchData(optionsDetails, setMediaContentDetails);
  }, [mediaType, id]);

  if (!mediaContentDetails) {
    return <div className="ContentDetails">Loading content details...</div>;
  }

  const {
    title,
    name,
    tagline,
    vote_average,
    homepage,
    imdb_id,
    runtime,
    original_language,
    release_date,
    status,
    genres,
    overview,
    poster_path,
  } = mediaContentDetails;

  const ratingValue = vote_average ? Number((vote_average / 2).toFixed(1)) : 0;

  return (
    <div className="ContentDetails">
      <LazyLoadImage
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : placeholderImage
        }
        alt={title || name || "Media Poster"}
        className="CoverImage"
        effect="blur"
        placeholderSrc={placeholderImage}
        draggable={false}
      />

      <h1>{title || name}</h1>
      {tagline && <p className="Tagline">"{tagline}"</p>}

      <div className="Rating">
        <div className="RatingText">
          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Official Website"
            >
              <img src={HomeIcon} alt="Official Site" loading="lazy" />
            </a>
          )}
          {ratingValue}
          {imdb_id && (
            <a
              href={`https://www.imdb.com/title/${imdb_id}/`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IMDb Page"
            >
              <img src={IMDbIcon} alt="IMDb" loading="lazy" />
            </a>
          )}
        </div>
        <Stars
          count={5}
          value={RoundStars(ratingValue)}
          size={24}
          color1="#999"
          color2="#ffd700"
          half={true}
          edit={false}
        />
      </div>

      <div className="BasicInfo">
        {runtime !== undefined && (
          <div className="Length">
            <h2>Length</h2>
            <span>{runtime} min.</span>
          </div>
        )}
        {original_language && (
          <div className="Language">
            <h2>Language</h2>
            <span>{GetLanguageName(original_language)}</span>
          </div>
        )}
        {release_date && (
          <div className="Year">
            <h2>Year</h2>
            <span>{new Date(release_date).getFullYear()}</span>
          </div>
        )}
        {status && (
          <div className="Status">
            <h2>Status</h2>
            <span>{status}</span>
          </div>
        )}
      </div>

      {genres && genres.length > 0 && (
        <div className="Genres">
          <h2>Genres</h2>
          <div className="GenresWrapper">
            {genres.map((genre) => (
              <span key={genre.id} className="Genre">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {overview && (
        <div className="Overview">
          <h2>Synopsis</h2>
          <p>{overview}</p>
        </div>
      )}
    </div>
  );
}

export default ContentDetails;
