import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../HelperFunctions";
import Carousel from "react-multi-carousel";
import ReactPlayer from "react-player";
import "react-multi-carousel/lib/styles.css";
import "./styling/css/VidoeCarousel.css";

function VideoCarousel() {
  const { mediaType, id } = useParams();
  const [videos, setVideos] = useState({ results: [] });
  const [playingIndex, setPlayingIndex] = useState(null);

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

    FetchData(optionsVideos, setVideos);
    setPlayingIndex(null); // Reset when ID changes
  }, [mediaType, id]);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  if (videos.results.length === 0) return null;

  return (
    <div className="video-carousel">
      <h1>Videos</h1>
      <Carousel
        swipeable
        draggable
        responsive={responsive}
        ssr={false}
        infinite={false}
        autoPlay={false}
        keyBoardControl
        transitionDuration={300}
        containerClass="carousel-container"
        itemClass="carousel-item"
      >
        {videos.results.map((video, index) => {
          const videoUrl = `https://www.youtube.com/watch?v=${video.key}`;
          const thumbnailUrl = `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;

          return (
            <div key={video.id || index} className="video-wrapper">
              {playingIndex === index ? (
                <ReactPlayer
                  url={videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing
                />
              ) : (
                <div
                  className="video-thumbnail"
                  style={{
                    backgroundImage: `url(${thumbnailUrl})`,
                  }}
                  onClick={() => setPlayingIndex(index)}
                >
                  <div className="play-button-overlay">▶</div>
                </div>
              )}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default VideoCarousel;
