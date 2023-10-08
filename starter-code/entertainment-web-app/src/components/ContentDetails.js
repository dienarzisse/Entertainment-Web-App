import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetLanguageName } from "../HelperFunctions";
import { FetchData } from "../HelperFunctions";
import { RoundStars } from "../HelperFunctions";
import Stars from "react-stars";
import IMDbIcon from "../assets/imdb-logo.svg";
import HomeIcon from "../assets/home-logo.svg"
import "./styling/css/ContentDetails.css";
function ContentDetails() {
  const { mediaType, id } = useParams();
  const [mediaContentDetails, setmediaContentDetails] = useState(null);
  const roundOneDecimal = (value) => {
    return value.toFixed(1);
  };

  useEffect(() => {
    const optionsDetails = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };

    FetchData(optionsDetails, setmediaContentDetails);
  }, [mediaType, id]);

  if (!mediaContentDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div className="ContentDetails">
      <img
        src={`https://image.tmdb.org/t/p/original${mediaContentDetails.poster_path}`}
        alt="cover"
        className="CoverImage"
      ></img>
      <h1>
        {mediaContentDetails.title
          ? mediaContentDetails.title
          : mediaContentDetails.name}
      </h1>
      <p>{mediaContentDetails.tagline}</p>

      <div className="Rating">
        <div className="RatingText">
          <a
            href="http://www.oppenheimermovie.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src={HomeIcon} alt="IMDb"></img>
          </a>
          {roundOneDecimal(mediaContentDetails.vote_average / 2)}
          <a
            href={`https://www.imdb.com/title/${mediaContentDetails.imdb_id}/`}
            target="_blank"
            rel="noreferrer"
          >
            <img src={IMDbIcon} alt="IMDb"></img>
          </a>
        </div>
        <Stars
          count={5}
          value={RoundStars(
            roundOneDecimal(mediaContentDetails.vote_average / 2)
          )}
          size={24}
          color1={"#999"} // Unselected star color
          color2={"#ffd700"} // Selected star color
          half={true} // Enable half stars
        />
      </div>

      <div className="BasicInfo">
        <div className="Length">
          <h2>Length</h2>
          <span>{mediaContentDetails.runtime + " min."}</span>
        </div>
        <div className="Language">
          <h2>Language</h2>
          <span>{GetLanguageName(mediaContentDetails.original_language)}</span>
        </div>
        <div className="Year">
          <h2>Year</h2>
          <span>
            {new Date(mediaContentDetails.release_date).getFullYear()}
          </span>
        </div>
        <div className="Status">
          <h2>Status</h2>
          <span>{mediaContentDetails.status}</span>
        </div>
      </div>

      <div className="Genres">
        <h2>Genres</h2>
        <div className="GenresWrapper">
          {mediaContentDetails.genres.map((item) => {
            return (
              <span key={item.id} className="Genre">
                {item.name}
              </span>
            );
          })}
        </div>
      </div>

      <div className="Overview">
        <h2>Synopsis</h2>
        <p>{mediaContentDetails.overview}</p>
      </div>
    </div>
  );
}

export default ContentDetails;
