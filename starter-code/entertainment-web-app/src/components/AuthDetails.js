import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
function AuthDetails({ setSignedIn }) {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out was succesful");
        setSignedIn(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="AuthDetails">
      {authUser ? (
        <>
          <p>Signed In</p>
          <br></br>
          <button className="SignOut" onClick={userSignOut}>
            SignOut
          </button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
}
export default AuthDetails;
