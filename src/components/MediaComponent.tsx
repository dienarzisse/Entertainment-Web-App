import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { APIOPTIONS } from "../APIOptions";
import { StringToTitle } from "../HelperFunctions";
import Loading from "./Loading";
import Content from "./Content";
import "./styling/css/MediaComponent.css";

interface MediaItem {
  id: number;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  media_type?: string;
  adult: boolean;
  vote_average: number;
}

interface MediaComponentProps {
  mediaType?: string;
  category?: string;
  page?: number;
  seeMore?: boolean;
  genre_id?: string;
  genre_name?: string;
  keyword?: string;
}

const MediaComponent: React.FC<MediaComponentProps> = ({
  mediaType,
  category,
  page = 1,
  seeMore = false,
  genre_id,
  genre_name,
  keyword,
}) => {
  const [list, setList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        if (genre_id && mediaType) {
          await APIOPTIONS.fetchData(
            APIOPTIONS.getGenreContentOptions(mediaType, page, genre_id),
            setList
          );
        } else if (keyword) {
          await APIOPTIONS.fetchData(
            APIOPTIONS.getKeywordOptions(keyword, page),
            setList
          );
        } else if (category && mediaType) {
          await APIOPTIONS.fetchData(
            APIOPTIONS.getContentOptions(mediaType, category, page),
            setList
          );
        } else {
          setList([]); // Clear list if no valid params
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setList([]); // Clear list on error
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [category, mediaType, page, genre_id, keyword]);

  if (loading) return <Loading />;

  if (list.length === 0)
    return (
      <div className="MediaComponent">
        <h2>No results found.</h2>
      </div>
    );
  console.log(list)
  const mappedList = list.map((item) => (
    <Content
      key={item.id}
      id={item.id}
      imgSrc={item.backdrop_path}
      year={
        item.release_date
          ? new Date(item.release_date).getFullYear()
          : item.first_air_date
          ? new Date(item.first_air_date).getFullYear()
          : "N/A"
      }
      name={item.title ?? item.name ?? "Unknown"}
      mediaType={item.media_type ?? mediaType ?? "unknown"}
      adult={item.adult}
      rating={item.vote_average / 2}
    />
  ));

  const buildSeeMoreLink = () => {
    if (!mediaType) return "#";
    if (genre_id) return `/${mediaType}/genre/${genre_id}/details/${page}`;
    if (keyword) return `/${mediaType}/keyword/${keyword}/details/${page}`;
    if (category) return `/${mediaType}/${category}/details/${page}`;
    return "#";
  };

  const getHeaderTitle = () => {
    if (genre_id) return StringToTitle(genre_name || "Genre");
    if (keyword) return `Results for "${StringToTitle(keyword)}"`;
    if (category) return StringToTitle(category);
    return "Media";
  };

  return (
    <div className={category === "trending" ? "Trending" : "MediaComponent"}>
      <nav>
        <div className="Header-Wrapper">
          <h1>{getHeaderTitle()}</h1>
          {mediaType && (
            <div className="Media-Type">{mediaType.toUpperCase()}</div>
          )}
        </div>

        {seeMore && (
          <Link
            to={buildSeeMoreLink()}
            className="Link"
            aria-label="See more content"
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
