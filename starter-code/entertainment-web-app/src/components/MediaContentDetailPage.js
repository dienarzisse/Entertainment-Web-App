import React, { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { GetLanguageName } from "../HelperFunctions";
import "./styling/css/MediaContentDetailPage.css";
import Content from "./Content";
import Providers from "./Providers";
import VideoCarousel from "./VideoCarousel";

const MediaContentDetailPage = () => {
  const { mediaType, id } = useParams();
  const [mediaContentDetails, setmediaContentDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarList, setSimilarList] = useState({ results: [] });
  const [imagesList, setImagesList] = useState({ backdrops: [] });
  // Mapping the lists
  const mappedSimilarList = similarList.results
    .filter((item) => {
      if (item.backdrop_path !== null) return item;
      return null;
    })
    .map((item) => (
      <Content
        key={item.id}
        id={item.id}
        imgSrc={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
        year={
          new Date(item.release_date).getFullYear()
            ? new Date(item.release_date).getFullYear()
            : new Date(item.first_air_date).getFullYear()
        }
        name={item.title ? item.title : item.name}
        mediaType={item.media_type ? item.media_type : mediaType}
        adult={item.adult}
      />
    ));

  const mappedImagesList = imagesList.backdrops.map((item) => {
    return (
      <img
        key={nanoid()}
        src={`https://image.tmdb.org/t/p/original${item.file_path}`}
        alt="media content"
      ></img>
    );
  });


  const fetchData = async (options, setter) => {
    try {
      const response = await axios(options);
      const resultList = response.data;
      setter(resultList);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };

    const optionsCredits = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };

    const optionsSimilar = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}/similar?language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };

    const optionsImages = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}/images`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };

    const optionsProviders = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };

    fetchData(options, setmediaContentDetails);
    fetchData(optionsCredits, setCredits);
    fetchData(optionsSimilar, setSimilarList);
    fetchData(optionsImages, setImagesList);
  }, [mediaType, id]);

  if (!mediaContentDetails) {
    return <div>Loading...</div>;
  }

  // break this in subcomponents after. it's too big and messy
  // also add images to casts
  // also watch providers (where you can watch it)
  // add rating system
  return (
    <div className="MediaContentDetailPage">
      <img
        src={`https://image.tmdb.org/t/p/original${mediaContentDetails.poster_path}`}
        alt="cover"
      ></img>
      <h1>
        {mediaContentDetails.title
          ? mediaContentDetails.title
          : mediaContentDetails.name}
      </h1>
      <p>{mediaContentDetails.tagline}</p>
      <div className="Rating">
        {parseInt((mediaContentDetails.vote_average * 10) / 2) / 10}
      </div>

      <div className="Basic-Info">
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
        <div className="Genres-Wrapper">
          {mediaContentDetails.genres.map((item) => {
            return <span key={item.id}>{item.name}</span>;
          })}
        </div>
      </div>

      <div className="Overview">
        <h1>Synopsis</h1>
        <p>{mediaContentDetails.overview}</p>
      </div>

      <div className="Belongs-Collection">
        <div className="Collection">
          {mediaContentDetails.belongs_to_collection && (
            <>
              <h1>Collection</h1>
              <h2>{mediaContentDetails.belongs_to_collection.name}</h2>
              <img
                src={`https://image.tmdb.org/t/p/original${mediaContentDetails.belongs_to_collection.poster_path}`}
                alt="cover"
              ></img>{" "}
            </>
          )}
        </div>
      </div>
      <div className="Credits">
        <h1>Casts</h1>
        {credits &&
          credits.cast.map((item) => {
            return <span key={item.cast_id}>{item.name}</span>;
          })}
      </div>

      <div className="Images">
        <h1>Images</h1>
        {mappedImagesList}
      </div>
      <Providers />
      <VideoCarousel />
      <div className="Similar-Content">
        <h1>Similar</h1>
        {mappedSimilarList}
      </div>

      <div className="Links">
        <a
          href="http://www.oppenheimermovie.com"
          target="_blank"
          rel="noreferrer"
        >
          Home Page
        </a>
        <a
          href={`https://www.imdb.com/title/${mediaContentDetails.imdb_id}/`}
          target="_blank"
          rel="noreferrer"
        >
          IMBD
        </a>
      </div>
    </div>
  );
};

export default MediaContentDetailPage;
