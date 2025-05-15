import "./styling/css/App.css";
import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

const Home = lazy(() => import("./Home"));
const DetailedView = lazy(() => import("./DetailedView"));
const SearchView = lazy(() => import("./SearchView"));
const Genres = lazy(() => import("./Genres"));
const GenresList = lazy(() => import("./GenresList"));
const MediaContentDetailPage = lazy(() => import("./MediaContentDetailPage"));

function App() {
  const initialSignedIn = false;

  // Persist signedIn state using localStorage
  const [signedIn, setSignedIn] = useState(() => {
    const stored = localStorage.getItem("signedIn");
    return stored ? JSON.parse(stored) : initialSignedIn;
  });

  // Reflect changes in localStorage when signedIn changes
  useEffect(() => {
    localStorage.setItem("signedIn", JSON.stringify(signedIn));
  }, [signedIn]);

  // Tracks if user has an account or not (for login/signup toggling)
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <div className="App">
      <NavBar />
      <SearchBar />

      <Suspense fallback={<h1>Loading...</h1>}>
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
      </Suspense>
    </div>
  );
}

export default App;
