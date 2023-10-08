import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../HelperFunctions";
import Content from "./Content";
import "./styling/css/SimilarContent.css";
function SimilarContent() {
  const { mediaType, id } = useParams();
  const [similarList, setSimilarList] = useState({ results: [] });
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
        rating={item.vote_average / 2}
      />
    ));

    useEffect(() => {
      const optionsSimilar = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${mediaType}/${id}/similar?language=en-US&page=1`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
        },
      };
      FetchData(optionsSimilar, setSimilarList);
    }, [mediaType, id]);
  return (
    <div className="SimilarContent">
      <h1>Similar</h1>
      <div className="SimilarContentMap">
        {mappedSimilarList}
        </div>
    </div>
  );
}

export default SimilarContent;
