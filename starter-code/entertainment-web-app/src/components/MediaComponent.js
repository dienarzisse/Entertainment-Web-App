import Content from "./Content";
import "./styling/css/MediaComponent.css";
import { nanoid } from "nanoid";
import axios from "axios";
import { useEffect, useState } from "react";

function MediaComponent({ mediaType, category }) {
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem(`list${mediaType}${category}`);
    return savedList ? JSON.parse(savedList) : [];
  });
  const [map, setMap] = useState();
  // If list is not empty, map the elements of list
  const mapList = () => {
    if (list) {
      const mappedList = list.map((item) => {
        return (
          <Content
            key={nanoid()}
            imgSrc={`https://image.tmdb.org/t/p/original` + item.poster_path}
            year={new Date(item.release_date).getFullYear()}
            name={item.title}
            type={item.media_type}
            adult={item.adult}
          />
        );
      });
      setMap(mappedList);
    }
  };

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${mediaType}/${category}?language=en-US&page=1`,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
    },
  };
  useEffect(() => {
    async function fetchData() {
      // trending movies
      axios(options)
        .then(function (response) {
          setList(response.data.results.slice(0, 6));
          localStorage.setItem(
            `list${mediaType}${category}`,
            JSON.stringify(list)
          );
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    fetchData();
    mapList();
  }, [category, mediaType]);
console.log(list);
  return (
    <div className="MediaComponent">
      <h1>{`${category} `}</h1>
      <div className="ContentGrid">{map}</div>
    </div>
  );
}

export default MediaComponent;
