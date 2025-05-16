// Styles
import "@styling/LandingPage.css";

// React
import React from "react";

// Components
import LogIn from "@components/auth/LogIn";
import SignUp from "@components/auth/SignUp";

// Assets
import Logo from "@assets/logo.svg";

// Effects & Media
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface LandingPageProps {
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LandingPage: React.FC<LandingPageProps> = ({
  hasAccount,
  setHasAccount,
  setSignedIn,
}) => {
  return (
    <div className="LandingPage">
      <LazyLoadImage src={Logo} alt="logo" className="LandingPage-logo" />
      {hasAccount ? (
        <LogIn setHasAccount={setHasAccount} setSignedIn={setSignedIn} />
      ) : (
        <SignUp setHasAccount={setHasAccount} />
      )}
    </div>
  );
};

export default LandingPage;
