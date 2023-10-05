import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapList from "./MapList";
const DetailedView = () => {
  const { mediaType, category, page } = useParams();
 const [currentPage, setCurrentPage] = useState(parseInt(page));
  const navigate = useNavigate();
  const mappedList = MapList(mediaType, category, page, 20);


   const goToPreviousPage = () => {
     if (currentPage > 1) {
       setCurrentPage(currentPage - 1);
       navigate(`/${mediaType}/${category}/${currentPage - 1}/details`);
       window.scrollTo(0, 0);
      }
   };

   const goToNextPage = () => {
     setCurrentPage(currentPage + 1);
     navigate(`/${mediaType}/${category}/${currentPage + 1}/details`);
     window.scrollTo(0, 0);
    };

   return (
     <div className="DetailedView">
       {mappedList}
       <div>
         <button onClick={goToPreviousPage}>Previous Page</button>
         <span>Page {currentPage}</span>
         <button onClick={goToNextPage}>Next Page</button>
       </div>
     </div>
   );
};

export default DetailedView;
