import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import "./styling/css/VidoeCarousel.css";

function VideoCarousel() {
  const { mediaType, id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState({ results: [] });

  console.log(videos);
  const fetchData = async (options, setter) => {
    try {
      const response = await axios(options);
      const resultList = response.data;
      setter(resultList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const optionsVideos = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };
    setCurrentIndex(0);
    fetchData(optionsVideos, setVideos);
  }, [mediaType, id]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1  : videos.results.length - 2
    );
  };

  const handleNextClick = () => {
    // you have to fix this trash that's happening
    setCurrentIndex((prevIndex) =>
      prevIndex < videos.results.length - 2 ? prevIndex + 1 : 0
    );
  };

  if (videos.results.length === 0) {
    return null; // Do not render anything if there are no videos
  }

  return (
    <div className="video-carousel">
      <button onClick={handlePrevClick}>Previous</button>
      <div className="video-list-container">
        <div
          className="video-list"
          style={{ transform: `translateX(-${currentIndex * 620}px)` }}
        >
          {videos.results.map((video) => (
            <ReactPlayer
              key={video.id}
              url={`https://www.youtube.com/watch?v=${video.key}`}
              width="100%"
              height="100%"
              controls={true}
              playing={currentIndex === video.id}
            />
          ))}
        </div>
      </div>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default VideoCarousel;