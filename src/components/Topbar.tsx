import { ReactNode } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../auth";
import { useAuth } from "../contexts/authContext";  
import { isLoggedIn, getUser } from "../authUtils";

interface Props {
  children: ReactNode;
}

export const Topbar = ({ children }: Props) => {
  const navigate = useNavigate(); 

  const { currentUser, userLoggedIn, loading, setCurrentUser } = useAuth();  // Destructure `setCurrentUser` here

  const temp = async () => {
    try {
      const userCredential = await doSignInWithGoogle();
      const user = userCredential.user;
      console.log(user);
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("user", JSON.stringify(user));
      
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  }
  
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
        <Button btnName="Testing" color="secondary" onSelectBtn={temp}>
          <p className="topbar-right" style={{color: '#ffffff'}}>Račun</p>
        </Button>
      </div>
    </div>
  );
};

export default Topbar;