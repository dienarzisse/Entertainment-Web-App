import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Logo from "../assets/logo.svg";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import "./styling/css/LandingPage.css";

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
