// import components
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Trending from "./Trending";
import MediaComponent from "./MediaComponent";
import "./styling/css/Home.css";
import "../Constants";
import { CATEGORIES, MEDIA_TYPES } from "../Constants";
function Home() {
  return (
    <div className="Home">
      <NavBar />
      <SearchBar />
      <Trending mediaType={MEDIA_TYPES.MOVIE} category={CATEGORIES.POPULAR} />
      <MediaComponent
        mediaType={MEDIA_TYPES.MOVIE}
        category={CATEGORIES.POPULAR}
      />
      <MediaComponent
        mediaType={MEDIA_TYPES.MOVIE}
        category={CATEGORIES.NOW_PLAYING}
      />
      <MediaComponent
        mediaType={MEDIA_TYPES.MOVIE}
        category={CATEGORIES.UPCOMING}
      />
    </div>
  );
}

export default Home;
