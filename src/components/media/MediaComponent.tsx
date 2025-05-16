// Styles
import "@styling/MediaComponent.css";

// React
import React, { useState, useEffect } from "react";

// Routing
import { Link } from "react-router-dom";

// API & Helpers
import { APIOPTIONS } from "@api/APIOptions";
import { StringToTitle } from "@helpers/HelperFunctions";

// Components
import Content from "@components/media/Content";

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
// Placeholder item for pre-rendering
const emptyPlaceholder: MediaItem = {
  id: -1,
  backdrop_path: null,
  release_date: "",
  first_air_date: "",
  title: "",
  name: "",
  media_type: "",
  adult: false,
  vote_average: 0,
};

const MediaComponent: React.FC<MediaComponentProps> = ({
  mediaType,
  category,
  page = 1,
  seeMore = false,
  genre_id,
  genre_name,
  keyword,
}) => {
  const [list, setList] = useState<MediaItem[]>(
    Array(20).fill(emptyPlaceholder)
  );
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
          setList(Array(20).fill(emptyPlaceholder));
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setList(Array(20).fill(emptyPlaceholder));
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [category, mediaType, page, genre_id, keyword]);

  const mappedList = list.map((item, index) => (
    <Content
      key={item.id !== -1 ? item.id : `placeholder-${index}`}
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

  if (loading) return null;

  return (
    <div
      className={
        category === "trending" && seeMore ? "Trending" : "MediaComponent"
      }
    >
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
