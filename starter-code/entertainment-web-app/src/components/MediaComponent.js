import MapList from "./MapList";
import { Link } from "react-router-dom";
import "./styling/css/Trending.css";
import "./styling/css/MediaComponent.css";
const MediaComponent = ({ mediaType, category, page = 1 }) => {
  const mappedList = MapList(mediaType, category, page);

  return (
    <div className={category === "trending" ? "Trending" : "MediaComponent"}>
      <h1>{category === "trending" ? "Trending" : `${category} `}</h1>
      <Link to={`/${mediaType}/${category}/${page}/details`}>See More</Link>
      <div className="ScrollContainer">
        <div className="ContentContainer">{mappedList}</div>
      </div>
    </div>
  );
};

export default MediaComponent;
