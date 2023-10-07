import MapList from "./MapList";
import { Link } from "react-router-dom";
import "./styling/css/MediaComponent.css";
import { StringToTitle } from "../HelperFunctions";
const MediaComponent = ({ mediaType, category, page = 1 }) => {
  const mappedList = MapList(mediaType, category, page);
  return (
    <div className={category === "trending" ? "Trending" : "MediaComponent"}>
      <nav>
        <div className="Header-Wrapper">
          <h1>{`${StringToTitle(category)}`}</h1>
          <div className="Media-Type">{mediaType}</div>
        </div>
        <Link to={`/${mediaType}/${category}/details/${page}`} className="Link">
          See More
        </Link>
      </nav>
      <div className="Container">
        <div className="ContentContainer">{mappedList}</div>
      </div>
    </div>
  );
};

export default MediaComponent;
