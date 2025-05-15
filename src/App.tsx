import "./App.css";
import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
const Home = lazy(() => import("./components/Home"));
const DetailedView = lazy(() => import("./components/DetailedView"));
const SearchView = lazy(() => import("./components/SearchView"));
const Genres = lazy(() => import("./components/Genres"));
const GenresList = lazy(() => import("./components/GenresList"));
const MediaContentDetailPage = lazy(() =>
  import("./components/MediaContentDetailPage")
);

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
