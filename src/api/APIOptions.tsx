import axios, { AxiosRequestConfig } from "axios";
import { CATEGORIES } from "../helpers/Constants";

const API_BASE_URL = "https://api.themoviedb.org/3";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4";

const defaultHeaders = {
  accept: "application/json",
  Authorization: AUTH_TOKEN,
};

type Setter<T> = (value: T) => void;

export const APIOPTIONS = {
  /**
   * Returns axios options to get content by media type and category.
   */
  getContentOptions: (
    mediaType: string,
    category: string,
    page: number
  ): AxiosRequestConfig => ({
    method: "GET",
    url: `${API_BASE_URL}/${
      category === CATEGORIES.TRENDING
        ? `trending/${mediaType}/day`
        : `${mediaType}/${category}`
    }?language=en-US&page=${page}`,
    headers: defaultHeaders,
  }),

  /**
   * Fetches data using axios and sets the results via setter.
   * @param options Axios request options
   * @param setter React state setter to update with results array
   */
  fetchData: async <T,>(
    options: AxiosRequestConfig,
    setter: Setter<T[]>
  ): Promise<void> => {
    try {
      const response = await axios(options);
      const resultList: T[] = response.data.results;
      setter(resultList);
    } catch (error) {
      // You might want to improve error handling here
      console.error("API fetch error:", error);
    }
  },

  /**
   * Returns axios options to get genre list for a given media type.
   */
  getGenreList: (mediaType: string): AxiosRequestConfig => ({
    method: "GET",
    url: `${API_BASE_URL}/genre/${mediaType}/list?language=en`,
    headers: defaultHeaders,
  }),

  /**
   * Returns axios options to get content filtered by genre.
   */
  getGenreContentOptions: (
    mediaType: string,
    page: number,
    genre_id: string
  ): AxiosRequestConfig => ({
    method: "GET",
    url: `${API_BASE_URL}/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre_id}`,
    headers: defaultHeaders,
  }),

  /**
   * Returns axios options to search content by keyword.
   */
  getKeywordOptions: (keyword: string, page: number): AxiosRequestConfig => ({
    method: "GET",
    url: `${API_BASE_URL}/search/multi?query=${encodeURIComponent(
      keyword
    )}&include_adult=false&language=en-US&page=${page}`,
    headers: defaultHeaders,
  }),
};
