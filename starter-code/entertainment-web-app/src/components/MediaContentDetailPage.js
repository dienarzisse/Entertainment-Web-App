import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MediaContentDetailPage = () => {
  const { mediaType, id } = useParams();
  const [mediaContentDetails, setmediaContentDetails] = useState(null);

 const fetchData = async (options) => {
   try {
     const response = await axios(options);
     const resultList = response.data
     setmediaContentDetails(resultList);
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

   fetchData(options);
 }, [mediaType]);

  if (!mediaContentDetails) {
    return <div>Loading...</div>;
  }
console.log(mediaContentDetails);
  return (
    <div>
      <h1>
        {mediaContentDetails.title
          ? mediaContentDetails.title
          : mediaContentDetails.name}
      </h1>
      <p>{mediaContentDetails.overview}</p>
      <p>{mediaContentDetails.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/original${mediaContentDetails.poster_path}`}
        alt="cover"
      ></img>
    </div>
  );
};

export default MediaContentDetailPage;
