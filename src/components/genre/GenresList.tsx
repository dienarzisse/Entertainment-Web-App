// React & Hooks
import React from "react";
import { useParams } from "react-router-dom";

// Components
import DetailedView from "@components/views/DetailedView";

interface GenresListParams {
  mediaType?: string;
  genre_id?: string;
  category?: string;
  page?: string;
}

const GenresList: React.FC = () => {
  const params = useParams();

  // Type assertion or destructure with fallback
  const {
    mediaType,
    genre_id,
    category = "popular",
    page,
  } = params as GenresListParams;

  return (
    <div className="GenresList">
      <DetailedView
        mediaType={mediaType}
        category={category}
        genre_id={genre_id}
        page={page}
      />
    </div>
  );
};

export default GenresList;
