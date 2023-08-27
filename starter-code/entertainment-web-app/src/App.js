import "./App.css";
import { useState, useEffect } from "react";
// import components
import LandingPage from "./components/LandingPage";
import AuthDetails from "./components/AuthDetails";
import Home from './components/Home';

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
      {/* {!signedIn && (
        <LandingPage
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          setSignedIn={setSignedIn}
        />
      )}
      <AuthDetails setSignedIn={setSignedIn} /> */}
      <Home />
    </div>
  );
}

export default App;
