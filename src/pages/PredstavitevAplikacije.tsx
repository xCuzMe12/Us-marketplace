import { useNavigate } from 'react-router-dom';


const PredstavitevAplikacije = () => {
  const navigate = useNavigate();

  return (
    <div style={{ overflow: "hidden", width: '1000px', height: '100%', marginLeft: '10%', marginTop: "3%" }}>
      <h1 style={{ marginBottom: "3%" }}>Predstavitev Uš D.O.O</h1>
      <p style={{color: "white", fontSize: "20px"}}>Spletna aplikacija je namenjena diskretni in anonimni spletni prodaji na črnem trgu. Uporabnikom omogoča enostavno prijavo z e-poštnim naslovom ter popolnoma zasebno komunikacijo prek šifriranih sporočil. Platforma podpira objavo oglasov za prodajo različnih izdelkov ali storitev, pri čemer zagotavlja visoko stopnjo varnosti in anonimnosti.

Vsak oglas vključuje možnost dodajanja slik, opisov in kategorij, kar omogoča hitro iskanje in preglednost. Zaščita identitete je ključna, saj sistem ne beleži občutljivih podatkov, komunikacija med uporabniki pa poteka prek varnih kanalov. Aplikacija vključuje tudi funkcionalnosti, kot so ocenitev prodajalcev, upravljanje objav ter integracijo plačilnih metod, ki so specifične za anonimno poslovanje (npr. kriptovalute).

S svojo diskretno zasnovo in uporabniku prijaznim vmesnikom aplikacija zagotavlja prostor, kjer lahko uporabniki brez skrbi trgujejo in komunicirajo. Idealna je za tiste, ki iščejo varno in zanesljivo platformo za občutljive posle na črnem trgu.
<br /><br /><br />Lastnika: Anonimno</p>
<img style={{width: "30%", borderRadius: "100%"}} src="src\logo\logo1.png" alt="LOGO" />
    </div>
  );
};

export default PredstavitevAplikacije;
