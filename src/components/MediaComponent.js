import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./styling/css/MediaComponent.css";
import { APIOPTIONS } from "../APIOptions";
import { StringToTitle } from "../HelperFunctions";
import Loading from "./Loading";
import Content from "./Content";
const MediaComponent = ({
  mediaType,
  category,
  page = 1,
  seeMore = false,
  genre_id = "",
  genre_name
}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useMemo(() => {
    setLoading(true);
    if (genre_id !== "")
      APIOPTIONS.fetchData(
        APIOPTIONS.getGenreContentOptions(mediaType,page, genre_id),
        setList
      );
    else
      APIOPTIONS.fetchData(
        APIOPTIONS.getContentOptions(mediaType, category, page, genre_id),
        setList
      );
    setLoading(false);
  }, [category, mediaType, page, genre_id]);

  const mappedList = list.map((item) => (
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

  if (loading) return Loading;
 return (
   <div className={category === "trending" ? "Trending" : "MediaComponent"}>
     <nav>
       <div className="Header-Wrapper">
         <h1>
           {genre_id
             ? `${StringToTitle(genre_name || "Unknown")}`
             : StringToTitle(category)}
         </h1>
         <div className="Media-Type">{mediaType}</div>
       </div>

       {seeMore && (
         <Link
           to={
             genre_id
               ? `/${mediaType}/genre/${genre_id}/details/${page}`
               : `/${mediaType}/${category}/details/${page}`
           }
           className="Link"
         >
           See More
         </Link>
       )}
     </nav>

     <div className="Container">
       <div className="ContentContainer">{mappedList}</div>
     </div>
   </div>
 );
};

export default MediaComponent;
