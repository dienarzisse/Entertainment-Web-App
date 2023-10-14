import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import LandingPage from "./components/LandingPage";
import AuthDetails from "./components/AuthDetails";
import MediaComponent from "./components/MediaComponent";
import SearchView from "./components/SearchView";
import DetailedView from "./components/DetailedView";
import Home from "./components/Home";
import MediaContentDetailPage from "./components/MediaContentDetailPage";
import MovieCategories from "./components/Genres";
import Genres from "./components/Genres";
import GenresList from "./components/GenresList";

function App() {
  const [hasAccount, setHasAccount] = useState(true);
  const initialSignedIn = false;

  // Retrieve the state from localStorage or use the initial value
  const [signedIn, setSignedIn] = useState(() => {
    const storedSignedIn = localStorage.getItem("signedIn");
    return storedSignedIn ? JSON.parse(storedSignedIn) : initialSignedIn;
  });

  // Update localStorage whenever the signedIn state changes
  useEffect(() => {
    localStorage.setItem("signedIn", JSON.stringify(signedIn));
  }, [signedIn]);

  return (
    <div className="App">
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:mediaType/:category/details/:page"
          element={<DetailedView />}
        />
        <Route path="/search/:keyword/:page" element={<SearchView />} />
        <Route path="/:mediaType/genres" element={<Genres />} />
        <Route
          path="/:mediaType/genre/:genre_id/:genre_name/:page"
          element={<GenresList />}
        />
        <Route path="/:mediaType/:id" element={<MediaContentDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
