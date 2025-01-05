import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children?: ReactNode;  

}

export const SideBar = ({ children = "" }: Props) => {

  const navigate = useNavigate(); // This should be outside the button handler

  const handleButton = () => {
    navigate("/NovOglas"); // Navigate to /NovOglas when button is clicked
  };

  return (
    <div className="bg-dark list-group sidebarOut">
      <h5 style={{color: '#780606'}}>{children}</h5>
      <ul className="list-unstyled" style={{marginTop: "3vh"}}>
        <li className="bg-dark my-2 d-flex align-items-center list-group-item list-group-item-action sidebar" onClick={handleButton}>       
          Objavi oglas
        </li>
        <li className="bg-dark my-2 d-flex align-items-center list-group-item list-group-item-action sidebar">       
          Moji oglasi
        </li>
        <li className="bg-dark my-2 d-flex align-items-center list-group-item list-group-item-action sidebar">       
          Filtriraj oglase
        </li>
        <li className="bg-dark my-2 d-flex align-items-center list-group-item list-group-item-action sidebar">       
          Predstavitev aplikacije
        </li>
       </ul>
    </div>
  );
};

export default SideBar;
