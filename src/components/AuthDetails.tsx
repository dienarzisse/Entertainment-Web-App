import React, { useEffect, useState } from "react";
import { auth } from "../api/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

interface AuthDetailsProps {
  setSignedIn: (signedIn: boolean) => void;
}

const AuthDetails: React.FC<AuthDetailsProps> = ({ setSignedIn }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setSignedIn(!!user); // Update signedIn state when auth state changes
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [setSignedIn]);

  const userSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Sign out was successful");
      setSignedIn(false);
      setAuthUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="AuthDetails">
      {authUser ? (
        <>
          <p>Signed In as {authUser.email}</p>
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
