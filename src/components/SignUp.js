import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
function SignUp({ setHasAccount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const handleCreateAccount = () => {
    setHasAccount(true);
  };
  // State handling
  const handleEmail = (email) => {
    setEmail(email);
  };
  const handlePassword = (password) => {
    setPassword(password);
  };
  const handleRepPassword = (repPassword) => {
    setRepPassword(repPassword);
  };
  const SignUpHandler = (e) => {
    e.preventDefault();
    if (password && password === repPassword)
     { 
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log(userCredentials);
        })
        .catch((error) => {
          console.log(error);
        });
        setEmail('');
        setPassword('');
        setRepPassword('');
      }
  };
  return (
    <div className="SignUp">
      <h1>SignUp</h1>
      <form onSubmit={SignUpHandler}>
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          type="email"
          placeholder="Email Adress"
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
        <label htmlFor="pwdred">Repeat Password:</label>
        <input
          value={repPassword}
          onChange={(e) => handleRepPassword(e.target.value)}
          type="password"
          placeholder="Repeate Password"
          id="pwdrep"
          name="pwdrep"
          minLength="8"
          required="required"
        ></input>
        <br></br>
        <input type="submit" value="Create an account"></input>
      </form>
      <p>
        Already have an account?
        <span onClick={handleCreateAccount}>Log In</span>
      </p>
    </div>
  );
}
export default SignUp;
