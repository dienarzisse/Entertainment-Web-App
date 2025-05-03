import React, { useState, useEffect, lazy } from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../HelperFunctions";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./styling/css/VidoeCarousel.css";

const LazyReactPlayer = lazy(() => import("react-player/lazy"));
function VideoCarousel() {
  const { mediaType, id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState({ results: [] });
  const mappedList = videos.results.map((video) => (
      <LazyReactPlayer
      fallback={<div>Loading...</div>}
        className="react-player"
        url={`https://www.youtube.com/watch?v=${video.key}`}
        width="100%"
        height="100%"
        controls={true}
        playing={currentIndex === video.id}
      />
  ));
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
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
    FetchData(optionsVideos, setVideos);
  }, [mediaType, id]);

   if (videos.results.length === 0) {
    return null; // Do not render anything if there are no videos
  }

  return (
    <div className="video-carousel">
      <h1>Videos</h1>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        //deviceType={true}//{this.props.deviceType}
        dotListClass="custom-dot-list-style"
        className="location-jobs "
        itemClass="carousel-item"
      >
        {mappedList}
      </Carousel>
    </div>
  );
}

export default VideoCarousel;