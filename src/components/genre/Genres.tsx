import "@styling/Genres.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PARITY } from "@helpers/Constants";
import { ApiClient } from "@api/ApiClient";
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

  useEffect(() => {
    if (!mediaType) return;
    ApiClient.fetchAndSet(ApiClient.getGenreList(mediaType), setList);
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
