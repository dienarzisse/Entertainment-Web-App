import "./styling/css/Home.css";
import MediaComponent from "./MediaComponent";
import { MOVIECATEGORIES, TVCATEGORIES, MEDIA_TYPES } from "../Constants";
function Home() {
  return (
    <div className="Home">
      <div className="Movies">
        <MediaComponent
          mediaType={MEDIA_TYPES.MOVIE}
          category={MOVIECATEGORIES.TRENDING}
          seeMore={true}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.MOVIE}
          category={MOVIECATEGORIES.POPULAR}
          seeMore={true}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.MOVIE}
          category={MOVIECATEGORIES.NOW_PLAYING}
          seeMore={true}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.MOVIE}
          category={MOVIECATEGORIES.UPCOMING}
          seeMore={true}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.MOVIE}
          category={MOVIECATEGORIES.TOP_RATED}
          seeMore={true}
        />
      </div>
      <div className="TV-Shows">
        <MediaComponent
          mediaType={MEDIA_TYPES.TV}
          category={TVCATEGORIES.TRENDING}
          seeMore={true}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.TV}
          category={TVCATEGORIES.POPULAR}
          seeMore={true}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.TV}
          category={TVCATEGORIES.AIRING_TODAY}
          seeMore={true}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.TV}
          category={TVCATEGORIES.ON_THE_AIR}
          seeMore={true}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.TV}
          category={TVCATEGORIES.TOP_RATED}
          seeMore={true}
        />
      </div>
    </div>
  );
}

export default Home;
