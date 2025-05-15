import React, { useState, useEffect, lazy, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../helpers/HelperFunctions";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./styling/css/VidoeCarousel.css";

const LazyReactPlayer = lazy(() => import("react-player/lazy"));

interface Video {
  id: string; // YouTube video IDs are strings
  key: string;
  name?: string;
  site?: string;
  type?: string;
}

interface VideosResponse {
  results: Video[];
}

function VideoCarousel() {
  const { mediaType, id } = useParams<{ mediaType?: string; id?: string }>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [videos, setVideos] = useState<VideosResponse>({ results: [] });

  useEffect(() => {
    if (!mediaType || !id) return;

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
    FetchData(optionsVideos, setVideos).catch(console.error);
  }, [mediaType, id]);

  if (videos.results.length === 0) {
    return null; // No videos to display
  }

  // Carousel responsive breakpoints
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  // Render videos inside Carousel
  const mappedList = videos.results.map((video, index) => {
    // Use index to control playing state, because video.id might not be numeric
    const isPlaying = currentIndex === index;
    const url = `https://www.youtube.com/watch?v=${video.key}`;

    return (
      <React.Suspense
        fallback={<div key={video.id}>Loading video...</div>}
        key={video.id}
      >
        <LazyReactPlayer
          className="react-player"
          url={url}
          width="100%"
          height="100%"
          controls={true}
          playing={isPlaying}
        />
      </React.Suspense>
    );
  });

  return (
    <div className="video-carousel">
      <h1>Videos</h1>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        ssr={false}
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        className="location-jobs"
        itemClass="carousel-item"
        afterChange={(previousIndex) => setCurrentIndex(previousIndex)}
      >
        {mappedList}
      </Carousel>
    </div>
  );
}

export default VideoCarousel;
