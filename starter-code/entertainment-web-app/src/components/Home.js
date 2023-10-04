// import components
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Trending from "./Trending";
import ContentCategorySection from "./ContentCategorySection";
import './styling/css/Home.css';
import { useEffect, useState } from "react";
import axios from 'axios';
function Home() {

  // States
  const [listTrendingMovies, setListTrendingMovies] = useState();
  const [listPopularMovies, setlistPopularMovies] = useState();

  const optionsTrendingMovies = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
    },
  };

  const optionsPopularMovies = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
    },
  };

  useEffect(() => {
    async function fetchData(){
    // trending movies 
    axios(optionsTrendingMovies)
      .then(function (response) {
        setListTrendingMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
      // popular movies
      axios(optionsPopularMovies)
        .then(function (response) {
          setlistPopularMovies(response.data.results);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    fetchData();
  },[]);
  
  return (
    <div className="Home">
      <NavBar />
      <SearchBar />
      <Trending trendingList={listTrendingMovies} />
      <ContentCategorySection trendingList={listPopularMovies} categoryTitle={"Popular Movies"} />
    </div>
  );
}

export default Home;
