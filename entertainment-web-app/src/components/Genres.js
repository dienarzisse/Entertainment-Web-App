import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../HelperFunctions";
import { APIOPTIONS } from "../APIOptions";
import GenreButton from "./GenreButton";
import { PARITY } from "../Constants";
import "./styling/css/Genres.css";
function Genres() {
  const [list, setList] = useState({genres: [{id: "", name: ""}]});
  const {mediaType} = useParams();
  const mappedList = list.genres.map((item, index) => {
    return (
      <GenreButton
        mediaType={mediaType}
        genre_name={item.name}
        genre_id={item.id}
        parity={index % 2 === 0 ? PARITY.EVEN : PARITY.ODD}
      />
    );
  });
  useEffect(() => {
    FetchData(APIOPTIONS.GenreList(mediaType), setList);
  }, [mediaType]);
  return <div className="Genres">
    {mappedList}
  </div>;
}

export default Genres;