import { ReactNode, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../auth";
import { useAuth } from "../contexts/authContext";  
import { addUserToDb, isLoggedIn, getUser } from "../authUtils";

interface Props {
  children: ReactNode;
}

export const Topbar = ({ children }: Props) => {
  const navigate = useNavigate(); 

  //const { currentUser, userLoggedIn, loading, setCurrentUser } = useAuth();  // Destructure `setCurrentUser` here
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const temp = async () => {
    try {
      const userCredential = await doSignInWithGoogle();
      const user = userCredential.user;
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("user", JSON.stringify(user));

      setLoggedIn(true);
      setCurrentUser(user.displayName || "Anonymous");

      const userCheck = {
        displayName: user.displayName || "Anonymous", 
        email: user.email || "", 
      };
      addUserToDb(userCheck);
        } catch (error) {
      console.error('Error during sign-in:', error);
    }
  }
  
  const logout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("user");
    setLoggedIn(false);
    setCurrentUser("");
    console.log("User logged out");
  };


  const handleButton = () => {
    navigate("/");
  };
  
  return (
    <div className="topbar">
      <div className="topbar-title">
        <Button btnName="Testing" color="bg-dark" onSelectBtn={handleButton}>
          <p className="topbar-right" style={{backgroundColor: "#121212", color: '#780606'}}>{children}</p>
        </Button>
      </div>
      <div className="topbar-right">
        {!loggedIn && <Button btnName="Testing" color="secondary" onSelectBtn={temp}>
          <p className="topbar-right" style={{color: '#ffffff'}}>Prijava</p>
        </Button>}
        {loggedIn && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h6 style={{ color: "#ffffff", margin: 0 }}>Prijavljen kot: {currentUser}</h6>
            <Button btnName="Logout" color="secondary" onSelectBtn={logout}>
              <p className="topbar-right" style={{ color: "#ffffff" }}>Odjava</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;