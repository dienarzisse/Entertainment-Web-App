import "./styling/css/LogIn.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// Define prop types
interface LogInProps {
  setHasAccount: (value: boolean) => void;
  setSignedIn: (value: boolean) => void;
}

function LogIn({ setHasAccount, setSignedIn }: LogInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = () => {
    setHasAccount(false);
  };

  const LogInHandler = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleEmail = (email: string) => setEmail(email);
  const handlePassword = (password: string) => setPassword(password);

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
          required
        />
        <br />
        <label htmlFor="pwd">Password:</label>
        <input
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          type="password"
          placeholder="Password"
          id="pwd"
          name="pwd"
          minLength={8}
          required
        />
        <br />
        <input type="submit" value="Login to your account" />
      </form>
      <p>
        Don’t have an account?
        <span onClick={handleCreateAccount}> Sign Up</span>
      </p>
    </div>
  );
}

export default LogIn;
