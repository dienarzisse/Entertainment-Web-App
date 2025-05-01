import { useState, useEffect } from "react";
import { FetchData } from "../HelperFunctions";
import { useParams } from "react-router-dom";
import UnknownIcon from "../assets/icon-unknown.svg";
import "./styling/css/Credits.css";
function Credits() {
  const { mediaType, id } = useParams();
  const [credits, setCredits] = useState({ cast: [] });
  const openNewTab = (item) => {
    const url = `https://www.themoviedb.org/person/${
      item.id
    }-${item.original_name
      .split(" ")
      .map((name) => name.toLowerCase())
      .join("-")}`;
    window.open(url, "_blank");
  };
  const mappedCredits = credits.cast.slice(0, 6).map((item) => {
    return (
      <div
        className="Profile-Card"
        key={item.cast_id}
        onClick={() => openNewTab(item)}
      >
        {item.profile_path ? (
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.profile_path}`}
            alt="profile"
          />
        ) : (
          <img src={UnknownIcon} alt="profile" />
        )}
        <div className="Actor-Details">
          <div className="Name">{item.name}</div>
          <div className="Caracter"><span>Playing: </span>{item.character}</div>
        </div>
      </div>
    );
  });
  useEffect(() => {
    const optionsCredits = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };

    FetchData(optionsCredits, setCredits);
  }, [mediaType, id]);
  if(credits.cast.length < 1)
    return null;
  return (
    <div className="Credits">
      <h1>Top Casts</h1>
      <div className="Casts">{mappedCredits}</div>
    </div>
  );
}

export default Credits;
