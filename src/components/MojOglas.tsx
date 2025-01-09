import { useNavigate } from "react-router-dom";

interface Props {
  naslov: string;
  imgSrc?: string;
  seller?: string;
  type: string;
  kategorija: string;
  cena?: string;
  opis?: string;
  onDelete: () => Promise<void>; // Add a delete handler prop
}

export const MojOglas = ({
  naslov,
  imgSrc = "",
  seller = "[anonymous]",
  type,
  kategorija,
  cena = "po dogovoru",
  opis,
  onDelete, // Destructure the onDelete prop
}: Props) => {

  const navigate = useNavigate();

  const onSelect = () => {
    navigate("/SelectedOglas", {
      state: { naslov, imgSrc, seller, type, kategorija, cena, opis }
    });
  }

  return (
    <div className="oglas" style={{ cursor:"default",minWidth: "41%", display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center" }}>
      <div style={{ display: "flex" }}>
        <p className="oglas-naslov">{naslov}</p>
        <p style={{ color: "#780606", paddingTop: "5px", paddingRight: "5px" }}>
          {cena}
        </p>
      </div>

      <div style={{ paddingRight: "20px" }}>
        <img src={imgSrc} alt={naslov}></img>
      </div>

      <div
        style={{
          color: "#600000",
          paddingTop: "5%",
          marginLeft: "16%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "-2%" }}
        >
          kategorija: {kategorija}
        </p>
        <p style={{ fontSize: "18px", marginBottom: "-2%" }}>vrsta: {type}</p>
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation(); 
          onDelete(); 
        }} 
        style={{
          justifySelf: "center",
          alignSelf: "center",
          width: "80%",
          backgroundColor: "#e53e3e", 
          color: "white", 
          border: "none", 
          padding: "10px", 
          borderRadius: "5px", 
          cursor: "pointer", 
          marginTop: "10%"
        }}>
        Izbriši
      </button>
    </div>
  );
};

export default MojOglas;
