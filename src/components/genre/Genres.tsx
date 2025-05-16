// Styles
import "@styling/Genres.css";

// React & Hooks
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Helpers
import { FetchData } from "@helpers/HelperFunctions";
import { PARITY } from "@helpers/Constants";

// API Config
import { ApiClient } from "@api/ApiClient";

// Components
import GenreButton from "@components/genre/GenreButton";

interface Genre {
  id: string | number;
  name: string;
}

interface GenreList {
  genres: Genre[];
}

const Genres: React.FC = () => {
  const [list, setList] = useState<GenreList>({ genres: [] });
  const { mediaType } = useParams<{ mediaType: string }>();

  // Fetch genre list when mediaType changes
  useEffect(() => {
    if (!mediaType) return;
    FetchData(ApiClient.getGenreList(mediaType), setList);
  }, [mediaType]);

  return (
    <div className="Genres">
      {list.genres.map((item, index) => (
        <GenreButton
          key={item.id}
          mediaType={mediaType!}
          genre_name={item.name}
          genre_id={item.id}
          parity={index % 2 === 0 ? PARITY.EVEN : PARITY.ODD}
        />
      ))}
    </div>
  );
};

export default Genres;
