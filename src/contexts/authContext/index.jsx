import React, { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Correct Firebase module import
import { auth } from "../../firebase"; // Import `auth` from your firebase.js file



const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("AAAAAAA");
      if (user) {
        setCurrentUser({ ...user }); // Set user data
        setUserLoggedIn(true); // Mark user as logged in
      } else {
        setCurrentUser(null); // Clear user data
        setUserLoggedIn(false); // Mark user as logged out
      }
      setLoading(false); // Finish loading
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children after loading */}
    </AuthContext.Provider>
  );
}

export default AuthContext; // Export AuthContext itself if needed
