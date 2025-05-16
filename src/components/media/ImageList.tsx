// Styles
import "@styling/ImageList.css";

// React & Hooks
import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

// External Libraries & Styles
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Helpers
import { FetchData } from "@helpers/HelperFunctions";

const placeholderImage =
  "https://i.pinimg.com/736x/64/eb/ef/64ebefbbd558d77f1a1e0d01a4e050c1.jpg";

interface ImageItem {
  file_path: string;
}

interface ImagesResponse {
  backdrops: ImageItem[];
}

// Use this interface to access known param keys with optional values as strings
interface Params {
  mediaType?: string;
  id?: string;
}

const ImageList: React.FC = () => {
  // useParams returns Record<string, string | undefined> by default,
  // so cast it to your interface explicitly to get type info,
  // but keep values as strings or undefined
  const params = useParams() as Params;
  const { mediaType, id } = params;

  const [imagesList, setImagesList] = useState<ImagesResponse>({
    backdrops: [],
  });
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    if (!mediaType || !id) return;

    const optionsImages = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}/images`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzYwYzMxZTEzYjI5MTQ5YzQ1MWY5N2I2ZTU5YTY4MCIsInN1YiI6IjY0ZDM5ODE2ZDEwMGI2MDBlMjY3OGQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPFH4HfP8rNHFUWKvoFXRLlK6ifiRdGT3AAPgzX_Ht4",
      },
    };

    setLoading(true);
    FetchData(optionsImages, (data: ImagesResponse) => {
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
      <Carousel
        swipeable
        draggable
        showDots={false}
        responsive={responsive}
        ssr={false}
        infinite={true}
        autoPlay={true}
        arrows={false}
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item"
      >
        {imagesList.backdrops.map((item, index) => (
          <div key={item.file_path || index} className="ImageWrapper">
            <LazyLoadImage
              src={`https://image.tmdb.org/t/p/w1280${item.file_path}`}
              alt="Media Content"
              effect="blur"
              wrapperProps={{
                style: { transitionDelay: "0.1s" },
              }}
              placeholderSrc={placeholderImage}
              onError={(e: ErrorEvent) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = placeholderImage;
              }}
              className="ImageListItem"
              draggable={false}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageList;
