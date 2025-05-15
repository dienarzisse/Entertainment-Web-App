import React from "react";
import MediaComponent from "./MediaComponent";
import { useParams, useNavigate } from "react-router-dom";
import "./styling/css/DetailedView.css";

interface DetailedViewProps {
  mediaType?: string;
  genre_id?: string;
  genre_name?: string;
  category?: string;
  page?: string;
  keyword?: string;
}

const DetailedView: React.FC<DetailedViewProps> = ({
  mediaType,
  genre_id,
  genre_name,
  category,
  page,
  keyword,
}) => {
  const navigate = useNavigate();
  const initialPage = Number(page) || 1;
  const [currentPage, setCurrentPage] = React.useState(initialPage);

  React.useEffect(() => {
    setCurrentPage(Number(page) || 1);
  }, [page]);

  const goToPage = (newPage: number) => {
    setCurrentPage(newPage);

    let path: string;

    if (keyword) {
      path = `/search/${keyword}/${newPage}`;
    } else if (category) {
      path = `/${mediaType}/${category}/details/${newPage}`;
    } else if (genre_id && genre_name) {
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
