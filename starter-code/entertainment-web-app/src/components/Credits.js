import { useState, useEffect } from "react";
import { FetchData } from "../HelperFunctions";
import { useParams } from "react-router-dom";
function Credits(){
    const { mediaType, id } = useParams();
    const [credits, setCredits] = useState(null);
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
    return (
      <div className="Credits">
        <h1>Casts</h1>
        {credits &&
          credits.cast.map((item) => {
            return <span key={item.cast_id}>{item.name}</span>;
          })}
      </div>
    );
}

export default Credits;