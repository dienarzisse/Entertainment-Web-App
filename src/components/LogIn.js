import "./styling/css/LogIn.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
function LogIn({ setHasAccount, setSignedIn }) {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Handlers
  const handleCreateAccount = () => {
    setHasAccount(false);
  };
  const LogInHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        setSignedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
    setEmail("");
    setPassword("");
  };
  // Handle the state change
  const handleEmail = (email) => {
    setEmail(email);
  };
  const handlePassword = (password) => {
    setPassword(password);
  };

  return (
    <div className="LogIn">
      <h1>Login</h1>
      <form onSubmit={LogInHandler}>
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          type="email"
          placeholder="Email address"
          id="email"
          name="email"
          required="required"
        ></input>
        <br></br>
        <label htmlFor="pwd">Password:</label>
        <input
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          type="password"
          placeholder="Password"
          id="pwd"
          name="pwd"
          minLength="8"
          required="required"
        ></input>
        <br></br>
        <input type="submit" value="Login to your account"></input>
      </form>
      <p>
        Don’t have an account?
        <span onClick={handleCreateAccount}>Sign Up</span>
      </p>
    </div>
  );
}
export default LogIn;
