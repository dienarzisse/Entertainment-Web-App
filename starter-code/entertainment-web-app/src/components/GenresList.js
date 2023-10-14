import { useEffect, useState } from "react";
import { FetchData } from "../HelperFunctions";
import { APIOPTIONS } from "../APIOptions";
import { useParams } from "react-router-dom";
import Content from "./Content";
function GenresList(){
    const [list, setList] = useState({results: []});
    const { mediaType, genre_id } = useParams();
    const mappedList = list.results.map((item) => (
      <Content
        key={item.id}
        id={item.id}
        imgSrc={item.backdrop_path}
        year={
          new Date(item.release_date).getFullYear()
            ? new Date(item.release_date).getFullYear()
            : new Date(item.first_air_date).getFullYear()
        }
        name={item.title ? item.title : item.name}
        mediaType={item.media_type ? item.media_type : mediaType}
        adult={item.adult}
        rating={item.vote_average / 2}
      />
    ));
    useEffect(() => {
        FetchData(APIOPTIONS.SearchByGenre(mediaType, genre_id), setList);
    }, [mediaType, genre_id]);
    return(
        <div className="GenresList">
            {mappedList}
        </div>
    );
}

export default GenresList;