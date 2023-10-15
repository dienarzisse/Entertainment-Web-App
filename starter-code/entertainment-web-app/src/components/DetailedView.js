import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styling/css/DetailedView.css";
import { StringToTitle } from "../HelperFunctions";
import { CATEGORIES } from "../Constants";
import Content from "./Content";
const DetailedView = () => {
  const [list, setList] = useState([]);
  const { mediaType, category, page } = useParams();
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const navigate = useNavigate();
  const fetchData = async (options) => {
    try {
      const response = await axios(options);
      const resultList =
        category === CATEGORIES.TRENDING
          ? response.data.results
          : response.data.results.slice(0, 20);
      setList(resultList);
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


  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      navigate(`/${mediaType}/${category}/details/${currentPage - 1}`);
      window.scrollTo(0, 0);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    navigate(`/${mediaType}/${category}/details/${currentPage + 1}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="DetailedView">
      <div className="Header-Wrapper">
        <h1>{`${StringToTitle(category)}`}</h1>
      </div>
      <div className="ContentContainer">{mappedList}</div>
      <div className="Pages">
        <button onClick={goToPreviousPage} className="Previous">
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={goToNextPage} className="Next">
          Next
        </button>
      </div>
    </div>
  );
};

export default DetailedView;
