import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../HelperFunctions";
import { APIOPTIONS } from "../APIOptions";
function Genres() {
  const [list, setList] = useState([]);
  const {mediaType} = useParams();
  useEffect(() => {
    FetchData(APIOPTIONS.GenreList(mediaType), setList);
  }, [mediaType]);
  console.log(list);
  return <div className="Genres">{ mediaType } Categories fdassad</div>;
}

export default Genres;
