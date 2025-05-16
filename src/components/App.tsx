// Global styles
import "@styling/App.css";

// React & Hooks
import { useState, useEffect, lazy, Suspense } from "react";

// Router
import { Routes, Route, useLocation } from "react-router-dom";

// Core Components
import Home from "@components/Home";
import NavBar from "@components/NavBar";
import SearchBar from "@components/SearchBar";
import Loading from "@components/Loading";
import SignUp from "@components/SignUp";
import LogIn from "@components/LogIn";

// Lazy-loaded Pages
const DetailedView = lazy(() => import("@components/DetailedView"));
const SearchView = lazy(() => import("@components/SearchView"));
const Genres = lazy(() => import("@components/Genres"));
const GenresList = lazy(() => import("@components/GenresList"));
const MediaContentDetailPage = lazy(
  () => import("@components/MediaContentDetailPage")
);

function App() {
  const [signedIn, setSignedIn] = useState(() => {
    return true;
  });

  useEffect(() => {
    localStorage.setItem("signedIn", JSON.stringify(signedIn));
  }, [signedIn]);

  // You can keep this if you want manual scroll restoration:
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  // Add this to scroll to top on route change
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [hasAccount, setHasAccount] = useState(false);

  return (
    <div className="App">
      {!signedIn ? (
        <Suspense fallback={<Loading />}>
          {hasAccount ? (
            <LogIn setSignedIn={setSignedIn} setHasAccount={setHasAccount} />
          ) : (
            <SignUp setHasAccount={setHasAccount} />
          )}
        </Suspense>
      ) : (
        <>
          <NavBar />
          <SearchBar />
          <Suspense fallback={<Loading />}>
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
              <Route
                path="/:mediaType/:id"
                element={<MediaContentDetailPage />}
              />
            </Routes>
          </Suspense>
        </>
      )}
    </div>
  );
}

export default App;
