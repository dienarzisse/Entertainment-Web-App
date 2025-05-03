import Logo from "../assets/logo.svg";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import './styling/css/LandingPage.css';
function LandingPage({ hasAccount, setHasAccount, setSignedIn }) {
  return (
    <div className="LandingPage">
      <img src={Logo} alt="logo"></img>
      {hasAccount && (
        <LogIn setHasAccount={setHasAccount} setSignedIn={setSignedIn} />
      )}
      {!hasAccount && <SignUp setHasAccount={setHasAccount} />}
    </div>
  );
}
export default LandingPage;
