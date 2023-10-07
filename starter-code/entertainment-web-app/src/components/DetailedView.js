import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapList from "./MapList";
import "./styling/css/DetailedView.css";
import { StringToTitle } from "../HelperFunctions";
const DetailedView = () => {
  const { mediaType, category, page } = useParams();
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const navigate = useNavigate();
  const mappedList = MapList(mediaType, category, page, 20);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      navigate(`/${mediaType}/${category}/details/${currentPage - 1}`);
      window.scrollTo(0, 0);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    navigate(`/${mediaType}/${category}/details/${currentPage + 1}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="DetailedView">
      <div className="Header-Wrapper">
        <h1>{`${StringToTitle(category)}`}</h1>
      </div>
      <div className="ContentContainer">{mappedList}</div>
      <div className="Pages">
        <button onClick={goToPreviousPage} className="Previous">
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={goToNextPage} className="Next">
          Next
        </button>
      </div>
    </div>
  );
};

export default DetailedView;
