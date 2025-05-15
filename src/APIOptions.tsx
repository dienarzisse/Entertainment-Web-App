import axios from "axios";
import { CATEGORIES } from "./Constants";
export const APIOPTIONS = {
  getContentOptions: (mediaType, category, page) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${
        category === CATEGORIES.TRENDING
          ? `trending/${mediaType}/day`
          : `${mediaType}/${category}`
      }?language=en-US&page=${page}`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };
    return options;
  },
  fetchData: async (options, setter) => {
    try {
      const response = await axios(options);
  
      const resultList =response.data.results
      setter(resultList);
    } catch (error) {
      console.error(error);
    }
  },
  getGenreList: (mediaType) => {
    const Options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/genre/${mediaType}/list?language=en`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };
    return Options;
  },
  getGenreContentOptions: (mediaType, page, genre_id) => {
    const Options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre_id}`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };
    return Options;
  },
  getKeywordOptions: (keyword, page) => {
     const Options = {
       method: "GET",
       url: `https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&language=en-US&page=${page}`,
       headers: {
         accept: "application/json",
         Authorization:
           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
       },
     };
    return Options;
  },
};
