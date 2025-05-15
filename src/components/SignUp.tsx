import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function SignUp({ setHasAccount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [error, setError] = useState(null);

  const handleCreateAccount = () => {
    setHasAccount(true);
  };

  const SignUpHandler = (e) => {
    e.preventDefault();
    setError(null);
    if (!password || password !== repPassword) {
      setError("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        // Optionally reset or redirect here
        setEmail("");
        setPassword("");
        setRepPassword("");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message || "Failed to create account");
      });
  };

  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <form onSubmit={SignUpHandler}>
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email Address"
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
        <label htmlFor="pwdrep">Repeat Password:</label>
        <input
          value={repPassword}
          onChange={(e) => setRepPassword(e.target.value)}
          type="password"
          placeholder="Repeat Password"
          id="pwdrep"
          name="pwdrep"
          minLength={8}
          required
        />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="submit" value="Create an account" />
      </form>
      <p>
        Already have an account?{" "}
        <span
          onClick={handleCreateAccount}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Log In
        </span>
      </p>
    </div>
  );
}

export default SignUp;
