import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { APIOPTIONS } from "../APIOptions";
import { StringToTitle } from "../HelperFunctions";
import Loading from "./Loading";
import Content from "./Content";
import "./styling/css/MediaComponent.css";

const MediaComponent = ({
  mediaType,
  category,
  page = 1,
  seeMore = false,
  genre_id,
  genre_name,
  keyword,
}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);

      try {
        if (genre_id && page && mediaType) {
          await APIOPTIONS.fetchData(
            APIOPTIONS.getGenreContentOptions(mediaType, page, genre_id),
            setList
          );
        } else if (keyword && page) {
          await APIOPTIONS.fetchData(
            APIOPTIONS.getKeywordOptions(keyword, page),
            setList
          );
        } else if (category && mediaType && page) {
          await APIOPTIONS.fetchData(
            APIOPTIONS.getContentOptions(mediaType, category, page),
            setList
          );
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }

      setLoading(false);
    };

    fetchContent();
  }, [category, mediaType, page, genre_id, keyword]);

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

  const buildSeeMoreLink = () => {
    if (genre_id) return `/${mediaType}/genre/${genre_id}/details/${page}`;
    if (keyword) return `/${mediaType}/keyword/${keyword}/details/${page}`;
    return `/${mediaType}/${category}/details/${page}`;
  };

  const getHeaderTitle = () => {
    if (genre_id) return StringToTitle(genre_name || "Genre");
    if (keyword) return `Results for "${StringToTitle(keyword)}"`;
    return StringToTitle(category || "Category");
  };

  return (
    <div className={category === "trending" ? "Trending" : "MediaComponent"}>
      <nav>
        <div className="Header-Wrapper">
          <h1>{getHeaderTitle()}</h1>
          {mediaType && (<div className="Media-Type">{mediaType}</div>)}
        </div>

        {seeMore && (
          <Link to={buildSeeMoreLink()} className="Link">
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
