import Content from "./Content";
import "./styling/css/Trending.css";
// Content Component Constants Import
import { MEDIA_TYPES, AGE_TYPES } from "../Constants";
// Icon Imports
import BeyondEarth from "../assets/thumbnails/beyond-earth/regular/large.jpg";

function Trending() {
  return (
    <div className="Trending">
      <h1>Trending</h1>
      <div className="ScrollContainer">
        <div className="ContentContainer">
          <Content
            imgSrc={BeyondEarth}
            year="2019"
            name="Beyond Earth"
            type={MEDIA_TYPES.MOVIE}
            age={AGE_TYPES.PG}
          />
          <Content
            imgSrc={BeyondEarth}
            year="2019"
            name="Beyond Earth"
            type={MEDIA_TYPES.MOVIE}
            age={AGE_TYPES.PG}
          />
          <Content
            imgSrc={BeyondEarth}
            year="2019"
            name="Beyond Earth"
            type={MEDIA_TYPES.MOVIE}
            age={AGE_TYPES.PG}
          />
          <Content
            imgSrc={BeyondEarth}
            year="2019"
            name="Beyond Earth"
            type={MEDIA_TYPES.MOVIE}
            age={AGE_TYPES.PG}
          />
          <Content
            imgSrc={BeyondEarth}
            year="2019"
            name="Beyond Earth"
            type={MEDIA_TYPES.MOVIE}
            age={AGE_TYPES.PG}
          />
          <Content
            imgSrc={BeyondEarth}
            year="2019"
            name="Beyond Earth"
            type={MEDIA_TYPES.MOVIE}
            age={AGE_TYPES.PG}
          />
          <Content
            imgSrc={BeyondEarth}
            year="2019"
            name="Beyond Earth"
            type={MEDIA_TYPES.MOVIE}
            age={AGE_TYPES.PG}
          />
        </div>
      </div>
    </div>
  );
}

export default Trending;
