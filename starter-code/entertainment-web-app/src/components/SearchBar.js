import SearchIcon from '../assets/icon-search.svg';
import './styling/css/SearchBar.css';
function SearchBar() {
  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get("query");
    // Implement your search logic here
    console.log("Search query:", query);
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
        />
      </form>
    </div>
  );
}
export default SearchBar;
