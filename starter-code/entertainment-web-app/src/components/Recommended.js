import Content from "./Content";
import "./styling/css/Recommended.css";
import { MEDIA_TYPES, AGE_TYPES } from "../Constants";
// Icon Imports
import BeyondEarth from "../assets/thumbnails/beyond-earth/regular/large.jpg";

function Recommended() {
  return (
    <div className="Recommended">
      <h1>Recommended for you</h1>
      <div className="ContentGrid">
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
  );
}

export default Recommended;
