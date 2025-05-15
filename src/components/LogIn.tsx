import "./styling/css/LogIn.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";

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

  const LogInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials);
      setSignedIn(true);
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials and try again.");
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="LogIn">
      <h1>Login</h1>
      <form onSubmit={LogInHandler}>
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
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
        Don’t have an account?{" "}
        <span
          onClick={handleCreateAccount}
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleCreateAccount();
          }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default LogIn;
