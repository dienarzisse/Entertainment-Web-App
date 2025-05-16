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

export const ApiClient = {
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
  getGenreList: (mediaType: string): AxiosRequestConfig => ({
    method: "GET",
    url: `${API_BASE_URL}/genre/${mediaType}/list?language=en`,
    headers: defaultHeaders,
  }),
  getGenreContentOptions: (
    mediaType: string,
    page: number,
    genre_id: string
  ): AxiosRequestConfig => ({
    method: "GET",
    url: `${API_BASE_URL}/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre_id}`,
    headers: defaultHeaders,
  }),
  getKeywordOptions: (keyword: string, page: number): AxiosRequestConfig => ({
    method: "GET",
    url: `${API_BASE_URL}/search/multi?query=${encodeURIComponent(
      keyword
    )}&include_adult=false&language=en-US&page=${page}`,
    headers: defaultHeaders,
  }),
  getCreditsOptions: (mediaType: string, id: string): AxiosRequestConfig => ({
    method: "GET",
    url: `https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=en-US`,
    headers: defaultHeaders,
  }),
  getImagesOptions: (mediaType: string, id: string): AxiosRequestConfig => ({
    method: "GET",
    url: `https://api.themoviedb.org/3/${mediaType}/${id}/images`,
    headers: defaultHeaders,
  }),
  getSimilarOptions: (mediaType: string, id: string): AxiosRequestConfig => ({
    method: "GET",
    url: `https://api.themoviedb.org/3/${mediaType}/${id}/similar?language=en-US&page=1`,
    headers: defaultHeaders,
  }),
  fetchAndSet: async <T,>(
    options: AxiosRequestConfig,
    setter: Setter<T>
  ): Promise<void> => {
    try {
      const response = await axios(options);
      const resultList: T = response.data;
      setter(resultList);
    } catch (error) {
      // You might want to improve error handling here
      console.error("API fetch error:", error);
    }
  },
};
