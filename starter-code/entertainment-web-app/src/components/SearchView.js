import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StringToTitle } from "../HelperFunctions";
import axios from "axios";
import { MEDIA_TYPES } from "../Constants";
import Content from "./Content";
function SearchView() {
  const { keyword, page } = useParams();
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [list, setList] = useState([]);

  const navigate = useNavigate();
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      navigate(`/search/${keyword}/${currentPage - 1}`);
      window.scrollTo(0, 0);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    navigate(`/search/${keyword}/${currentPage + 1}`);
    window.scrollTo(0, 0);
  };

  const fetchData = async (options) => {
    try {
      const response = await axios(options);
      const resultList = response.data.results.filter((item) => {
        if (
          item.media_type === MEDIA_TYPES.MOVIE ||
          item.media_type === MEDIA_TYPES.TV
        )
          return item;
        return null;
      });
      setList(resultList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const optionsKeyword = {
      method: "GET",
      url: `https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };
    fetchData(optionsKeyword);
  }, [keyword]);

  const mapList = list.map((item) => (
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
      mediaType={item.media_type}
      adult={item.adult}
      rating={item.vote_average / 2}
    />
  ));

  return (
    <div className="SearchView">
      <div className="Header-Wrapper">
        <h1>{`${StringToTitle(keyword)}`}</h1>
      </div>
      <div className="ContentContainer">{mapList}</div>
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
}

export default SearchView;
