// Global styles
import "@styling/App.css";

// React & Hooks
import { useState, useEffect, lazy, Suspense } from "react";

// Router
import { Routes, Route, useLocation } from "react-router-dom";

// Core Components
import Home from "@components/landing/Home";
import NavBar from "@components/misc/NavBar";
import SearchBar from "@components/misc/SearchBar";
import Loading from "@components/misc/Loading";
import SignUp from "@components/auth/SignUp";
import LogIn from "@components/auth/LogIn";

// Lazy-loaded Pages
const DetailedView = lazy(() => import("@components/views/DetailedView"));
const SearchView = lazy(() => import("@components/views/SearchView"));
const Genres = lazy(() => import("@components/genre/Genres"));
const GenresList = lazy(() => import("@components/genre/GenresList"));
const MediaContentDetailPage = lazy(
  () => import("@components/media/MediaContentDetailPage")
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
