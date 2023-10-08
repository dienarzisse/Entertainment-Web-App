import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { FetchData } from "../HelperFunctions";
import { useParams } from "react-router-dom";
import "./styling/css/ImageList.css";
function ImageList() {
  const { mediaType, id } = useParams();
  const [imagesList, setImagesList] = useState({ backdrops: [] });
  const mappedImagesList = imagesList.backdrops.map((item) => {
    return (
      <img
        key={nanoid()}
        src={`https://image.tmdb.org/t/p/original${item.file_path}`}
        alt="media content"
      ></img>
    );
  });

  useEffect(() => {
    const optionsImages = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}/images`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };

    FetchData(optionsImages, setImagesList);
  }, [mediaType, id]);
  
 if (imagesList.backdrops.length === 0) {
   return null; // Do not render anything if there are no videos
 }
  return (
    <div className="ImageList">
      <h1>Images</h1>
      <div className="ImageListMap">
        {mappedImagesList}
      </div>
    </div>
  );
}

export default ImageList;
