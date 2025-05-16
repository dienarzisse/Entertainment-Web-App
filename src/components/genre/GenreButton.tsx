// Styles
import "@styling/GenreButton.css";

// React & Hooks
import React from "react";
import { useNavigate } from "react-router-dom";

interface GenreButtonProps {
  mediaType: string;
  genre_name: string;
  genre_id: number | string;
  parity?: string; // Optional, for styling like 'even'/'odd'
}

const GenreButton: React.FC<GenreButtonProps> = ({
  mediaType,
  genre_name,
  genre_id,
  parity = "",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${mediaType}/genre/${genre_id}/${genre_name}/1`);
  };

  return (
    <div
      className={`GenreButton ${parity}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      {genre_name}
    </div>
  );
};

export default GenreButton;
