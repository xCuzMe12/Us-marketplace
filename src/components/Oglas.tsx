import { useNavigate } from "react-router-dom";
import { isLoggedIn, getUser, logInAsk } from "../authUtils";


interface Props {
  naslov: string;
  imgSrc?: string;
  seller?: string;
  type: string;
  kategorija: string;
  cena?: string;
  opis?: string;
}

export const Oglas = ({
  naslov,
  imgSrc = "",
  seller = "[anonymous]",
  type,
  kategorija,
  cena = "po dogovoru",
  opis,
}: Props) => {

  const navigate = useNavigate();

  const onSelect = () => {
     if (isLoggedIn()) {

      navigate("/SelectedOglas",{ state: { naslov, imgSrc, seller, type, kategorija, cena, opis } });
    } else {
          const errorMsg = logInAsk();
        }
  }

  return (
    <div onClick={(onSelect)} className="oglas" style={{ scale: "1.3" }}>
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
        <p style={{ fontSize: "18px" }}>od: {seller}</p>
      </div>
    </div>
  );
};
export default Oglas;
