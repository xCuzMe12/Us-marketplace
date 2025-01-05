interface Props {
  naslov: string;
  imgSrc?: string;
  seller?: string;
  type: "produkt" | "storitev";
  kategorija: "droge" | "orožije" | "ljudje" | "organi" | "ostalo";
  cena?: string;
}

export const Oglas = ({
  naslov,
  imgSrc = "",
  seller = "[anonymous]",
  type,
  kategorija,
  cena = "po dogovoru",
}: Props) => {
  return (
    <div className="oglas" style={{ scale: "1.3" }}>
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
