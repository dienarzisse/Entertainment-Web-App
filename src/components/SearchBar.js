import { useState } from "react";
import SearchIcon from "../assets/icon-search.svg";
import "./styling/css/SearchBar.css";
import { useNavigate } from "react-router-dom";
function SearchBar() {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search/${userInput}/1`);
    window.scrollTo(0, 0);
    setUserInput();
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };
  return (
    <div className="SearchBar">
      <form
        className="search-form"
        onSubmit={handleSearch}
        onChange={handleChange}
        value={userInput}
      >
        <button className="search-button" type="submit">
          <img src={SearchIcon} alt="Search" />
        </button>
        <input
          className="search-input"
          type="text"
          name="query"
          placeholder="Search for movies or TV series"
        />
      </form>
    </div>
  );
}
export default SearchBar;
