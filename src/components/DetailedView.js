import React, { useState, useEffect } from "react";
import MediaComponent from "./MediaComponent";
import { useParams, useNavigate } from "react-router-dom";
import "./styling/css/DetailedView.css";

const DetailedView = () => {
  const { mediaType, genre_id, genre_name, category, page } = useParams();
  const navigate = useNavigate();

  const initialPage = Number(page) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    // Sync state if URL param changes
    setCurrentPage(Number(page) || 1);
  }, [page]);

  const goToPage = (newPage) => {
    setCurrentPage(newPage);
    const isCategory = category && category !== "";

    const path = isCategory
      ? `/${mediaType}/${category}/details/${newPage}`
      : `/${mediaType}/genre/${genre_id}/${genre_name}/${newPage}`;

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
