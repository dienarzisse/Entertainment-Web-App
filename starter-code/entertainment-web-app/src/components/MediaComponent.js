import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styling/css/MediaComponent.css";
import { CATEGORIES } from "../Constants";
import axios from "axios";
import { StringToTitle } from "../HelperFunctions";
import Loading from "./Loading";
import Content from "./Content";
const MediaComponent = ({ mediaType, category, page = 1, }) => {
  
const [list, setList] = useState([]);
const [loading, setLoading]= useState(false);

const fetchData = async (options) => {
  try {
    setLoading(true);
    const response = await axios(options);
    const resultList =
      category === CATEGORIES.TRENDING
        ? response.data.results
        : response.data.results.slice(0, 6);
    setList(resultList);
    setLoading(false);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${
      category === CATEGORIES.TRENDING
        ? `trending/${mediaType}/day`
        : `${mediaType}/${category}`
    }?language=en-US${`&page=${page}`}`,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
    },
  };

  fetchData(options);
}, [category, mediaType, page]);
const mappedList = list.map((item) => (
  <Content
    key={item.id}
    id={item.id}
    imgSrc={item.backdrop_path}
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


  if (loading) return Loading;
  return (
    <div className={category === "trending" ? "Trending" : "MediaComponent"}>
      <nav>
        <div className="Header-Wrapper">
          <h1>{`${StringToTitle(category)}`}</h1>
          <div className="Media-Type">{mediaType}</div>
        </div>
        <Link to={`/${mediaType}/${category}/details/${page}`} className="Link">
          See More
        </Link>
      </nav>
      <div className="Container">
        <div className="ContentContainer">{mappedList}</div>
      </div>
    </div>
  );
};

export default MediaComponent;
