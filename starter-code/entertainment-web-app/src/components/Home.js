// import components
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Trending from "./Trending";
import Recommended from "./Recommended";
import './styling/css/Home.css';
function Home() {
  return (
    <div className="Home">
      <NavBar />
      <SearchBar />
      <Trending />
      <Recommended />
    </div>
  );
}

export default Home;
