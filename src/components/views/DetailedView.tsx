// Styles
import "@styling/DetailedView.css";

// React & Hooks
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import MediaComponent from "@components/media/MediaComponent";

interface DetailedViewProps {
  mediaType?: string;
  genre_id?: string;
  genre_name?: string;
  category?: string;
  page?: string;
  keyword?: string;
}

const DetailedView: React.FC<DetailedViewProps> = () => {
  const params = useParams();

  // Type assertion or destructure with fallback
  const { mediaType, genre_id, genre_name, category, page, keyword } =
    params as DetailedViewProps;
  const navigate = useNavigate();
  const initialPage = Number(page) > 0 ? Number(page) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setCurrentPage(Number(page) > 0 ? Number(page) : 1);
  }, [page]);

  const goToPage = (newPage: number) => {
    if (newPage < 1) return; // Prevent going below page 1
    setCurrentPage(newPage);

    let path = "/";
    if (keyword) {
      // e.g. /search/snow/2
      path = `/search/${keyword}/${newPage}`;
    } else if (category) {
      // e.g. /movie/popular/details/2
      path = `/${mediaType}/${category}/details/${newPage}`;
    } else if (genre_id && genre_name) {
      // e.g. /tv/genre/12/Comedy/2
      path = `/${mediaType}/genre/${genre_id}/${genre_name}/${newPage}`;
    } else {
      path = "/}";
    }

    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="DetailedView">
      <MediaComponent
        mediaType={mediaType}
        category={category}
        genre_id={genre_id}
        genre_name={genre_name}
        keyword={keyword}
        page={currentPage}
      />

      <div className="Pages">
        {currentPage > 1 && (
          <button
            onClick={() => goToPage(Number(currentPage) - 1)}
            className="Previous"
          >
            Previous
          </button>
        )}
        <span>Page {currentPage}</span>
        <button
          onClick={() => goToPage(Number(currentPage) + 1)}
          className="Next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DetailedView;
