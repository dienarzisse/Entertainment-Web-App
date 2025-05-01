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
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.MOVIE}
          category={MOVIECATEGORIES.POPULAR}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.MOVIE}
          category={MOVIECATEGORIES.NOW_PLAYING}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.MOVIE}
          category={MOVIECATEGORIES.UPCOMING}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.MOVIE}
          category={MOVIECATEGORIES.TOP_RATED}
        />
      </div>
      <div className="TV-Shows">
        <MediaComponent
          mediaType={MEDIA_TYPES.TV}
          category={TVCATEGORIES.TRENDING}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.TV}
          category={TVCATEGORIES.POPULAR}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.TV}
          category={TVCATEGORIES.AIRING_TODAY}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.TV}
          category={TVCATEGORIES.ON_THE_AIR}
        />
        <MediaComponent
          mediaType={MEDIA_TYPES.TV}
          category={TVCATEGORIES.TOP_RATED}
        />
      </div>
    </div>
  );
}

export default Home;
