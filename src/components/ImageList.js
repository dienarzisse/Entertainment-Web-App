import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FetchData } from "../HelperFunctions";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./styling/css/ImageList.css";

const placeholderImage = "https://via.placeholder.com/1280x720?text=Loading...";

function ImageList() {
  const { mediaType, id } = useParams();
  const [imagesList, setImagesList] = useState({ backdrops: [] });
  const [loading, setLoading] = useState(true);

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

    FetchData(optionsImages, (data) => {
      setImagesList(data);
      setLoading(false);
    });
  }, [mediaType, id]);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  if (loading || imagesList.backdrops.length === 0) {
    return null;
  }

  return (
    <div className="ImageList">
      <h1>Images</h1>
      <Carousel
        swipeable
        draggable
        showDots={false}
        responsive={responsive}
        ssr={false}
        infinite
        autoPlay={false}
        keyBoardControl
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item"
      >
        {imagesList.backdrops.map((item, index) => (
          <div key={index} className="ImageWrapper">
            <LazyLoadImage
              src={`https://image.tmdb.org/t/p/w1280${item.file_path}`}
              alt="Media Content"
              effect="blur"
              placeholderSrc={placeholderImage}
              onError={(e) => (e.target.src = placeholderImage)}
              className="ImageListItem"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageList;
