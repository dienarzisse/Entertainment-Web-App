// Styles
import "@styling/SearchBar.css";

// React Hooks
import { useState, useCallback } from "react";

// Routing
import { useNavigate } from "react-router-dom";

// Image Lazy Loading
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Assets
import SearchIcon from "@assets/icon-search.svg";

function SearchBar() {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmedInput = userInput.trim();
      if (!trimmedInput) return;

      navigate(`/search/${encodeURIComponent(trimmedInput)}/1`);
      window.scrollTo(0, 0);
      setUserInput("");
    },
    [userInput, navigate]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  }, []);

  return (
    <div className="SearchBar">
      <form
        className="search-form"
        onSubmit={handleSearch}
        role="search"
        aria-label="Search movies or TV series"
      >
        <button
          className="search-button"
          type="submit"
          aria-label="Submit search"
        >
          <LazyLoadImage src={SearchIcon} alt="Search icon" />
        </button>
        <input
          className="search-input"
          type="text"
          name="query"
          placeholder="Search for movies or TV series"
          value={userInput}
          onChange={handleChange}
          autoComplete="off"
          aria-label="Search input"
        />
      </form>
    </div>
  );
}

export default SearchBar;
