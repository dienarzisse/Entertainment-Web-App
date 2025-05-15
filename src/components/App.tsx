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
const SignUp = lazy(() => import("./SignUp"));
const LogIn = lazy(() => import("./LogIn"));

function App() {
  const [signedIn, setSignedIn] = useState(() => {
    return true;
    // const stored = localStorage.getItem("signedIn");
    // return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("signedIn", JSON.stringify(signedIn));
  }, [signedIn]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  const [hasAccount, setHasAccount] = useState(false);

  return (
    <div className="App">
      {!signedIn ? (
        <Suspense fallback={<div className="LoadingScreen">Loading...</div>}>
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
          <Suspense fallback={<div className="LoadingScreen">Loading...</div>}>
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
