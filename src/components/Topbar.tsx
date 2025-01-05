import { ReactNode } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const Topbar = ({ children }: Props) => {
  const navigate = useNavigate(); // This should be outside the button handler

  
  const temp = () => {
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