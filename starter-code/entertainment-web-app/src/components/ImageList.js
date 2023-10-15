import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FetchData } from "../HelperFunctions";
import { useParams } from "react-router-dom";
import "./styling/css/ImageList.css";

function ImageList() {
  const { mediaType, id } = useParams();
  const [imagesList, setImagesList] = useState({ backdrops: [] });
  const mappedList = imagesList.backdrops.map((item, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/original${item.file_path}`}
            alt="media content"
            loading="lazy"
          />
        ));
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

  if (imagesList.backdrops.length === 0) {
    return null; // Do not render anything if there are no images
  }

  return (
    <div className="ImageList">
      <h1>Images</h1>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        //deviceType={true}//{this.props.deviceType}
        dotListClass="custom-dot-list-style"
        className="location-jobs "
      >
        {mappedList}
      </Carousel>
    </div>
  );
}

export default ImageList;
