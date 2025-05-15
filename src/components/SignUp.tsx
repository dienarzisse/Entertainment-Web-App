import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";
import "./styling/css/SignUp.css";
interface SignUpProps {
  setHasAccount: (value: boolean) => void;
}

function SignUp({ setHasAccount }: SignUpProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreateAccount = () => {
    setHasAccount(true);
  };

  const signUpHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!password || password !== repPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials);
      // Reset fields after success
      setEmail("");
      setPassword("");
      setRepPassword("");
      // Optionally, you can switch to login or sign-in here
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Failed to create account");
    }
  };

  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <form onSubmit={signUpHandler}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <label htmlFor="pwd">Password:</label>
        <input
          id="pwd"
          name="pwd"
          type="password"
          placeholder="Password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <label htmlFor="pwdrep">Repeat Password:</label>
        <input
          id="pwdrep"
          name="pwdrep"
          type="password"
          placeholder="Repeat Password"
          minLength={8}
          value={repPassword}
          onChange={(e) => setRepPassword(e.target.value)}
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
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") handleCreateAccount();
          }}
        >
          Log In
        </span>
      </p>
    </div>
  );
}

export default SignUp;
