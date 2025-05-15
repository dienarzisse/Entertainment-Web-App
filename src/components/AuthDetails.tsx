import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

interface AuthDetailsProps {
  setSignedIn: (signedIn: boolean) => void;
}

const AuthDetails: React.FC<AuthDetailsProps> = ({ setSignedIn }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out was successful");
        setSignedIn(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AuthDetails">
      {authUser ? (
        <>
          <p>Signed In</p>
          <button className="SignOut" onClick={userSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
