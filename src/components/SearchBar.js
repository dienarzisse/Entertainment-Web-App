import { useState } from "react";
import SearchIcon from "../assets/icon-search.svg";
import "./styling/css/SearchBar.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (userInput.trim() === "") return;
    navigate(`/search/${userInput}/1`);
    window.scrollTo(0, 0);
    setUserInput(""); // Clear the input field
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="SearchBar">
      <form className="search-form" onSubmit={handleSearch}>
        <button className="search-button" type="submit">
          <img src={SearchIcon} alt="Search" />
        </button>
        <input
          className="search-input"
          type="text"
          name="query"
          placeholder="Search for movies or TV series"
          value={userInput}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default SearchBar;
