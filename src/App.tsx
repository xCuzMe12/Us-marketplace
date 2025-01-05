import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import AlertClose from "./components/AlertClose";
import SideBar from "./components/SideBar";
import Topbar from "./components/Topbar"
import { Oglas } from "./components/Oglas";
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NovOglas from "./pages/NovOglas";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";


function App() {
  const [ads, setAds] = useState<any[]>([]);

   // Fetch ads dynamically
   useEffect(() => {
    const fetchAds = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ads"));
        const adsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAds(adsData);
      } catch (error) {
        console.error("Error fetching ads: ", error);
      }
    };
    fetchAds();
  }, []);


  
  

  return (
    <Router>
      <div className="d-flex" style={{ minHeight: "100vh", minWidth: "100vh", backgroundColor: '#343a40' }}>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <Topbar>UŠ</Topbar>
                <SideBar>Možnosti</SideBar>
              </>
            }
          />
        </Routes>

        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="d-flex oglas-area" style={{minHeight: "100vh"}}>
                  {ads.map((ad, index) => (
                    <Oglas
                      key={index}
                      naslov={ad.naslov}
                      imgSrc={ad.imgSrc}
                      seller={ad.seller}
                      type={ad.type}
                      kategorija={ad.kategorija}
                      cena={ad.cena}
                    />
                  ))}
                </div>
              }
            />         
            <Route path="/NovOglas" element={<NovOglas />} />
          </Routes>
        </div>       
      </div>
      <div style={{display: "flex"}}>
        <div className="fakeSidebar bg-dark" style={{display: "flex"}}></div>
        <div className="fakeBackground"></div>
      </div>
      
    </Router>
  );
}

export default App;