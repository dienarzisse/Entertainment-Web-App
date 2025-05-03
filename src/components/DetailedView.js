import React, { useState, useEffect } from "react";
import MediaComponent from "./MediaComponent";
import { useParams, useNavigate } from "react-router-dom";
import "./styling/css/DetailedView.css";

const DetailedView = () => {
  const { mediaType, genre_id, genre_name, category, page, keyword } =
    useParams();

  const navigate = useNavigate();
  const initialPage = Number(page) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setCurrentPage(Number(page) || 1);
  }, [page]);

  const goToPage = (newPage) => {
    setCurrentPage(newPage);

    let path;

    if (keyword) {
      // e.g., /search/snow/2
      path = `/search/${keyword}/${newPage}`;
    } else if (category) {
      // e.g., /movie/popular/details/2
      path = `/${mediaType}/${category}/details/${newPage}`;
    } else if (genre_id && genre_name) {
      // e.g., /tv/genre/12/Comedy/2
      path = `/${mediaType}/genre/${genre_id}/${genre_name}/${newPage}`;
    } else {
      path = "/";
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
            onClick={() => goToPage(currentPage - 1)}
            className="Previous"
          >
            Previous
          </button>
        )}
        <span>Page {currentPage}</span>
        <button onClick={() => goToPage(currentPage + 1)} className="Next">
          Next
        </button>
      </div>
    </div>
  );
};

export default DetailedView;
