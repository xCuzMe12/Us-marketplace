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
import { AuthProvider } from "./contexts/authContext"
import { isLoggedIn, getUser } from "./authUtils";
import SelectedOglas from "./pages/SelectedOglas";
import MojaSporocila from "./pages/MojaSporocila";
import MojiOglasi from "./pages/MojiOglasi"
import PredstavitevAplikacije from "./pages/PredstavitevAplikacije"

type Filters = {
  kategorija?: string;
  vrsta?: string;
  od?: string;
};

type Ad = {
  id: string;
  naslov: string;
  imgSrc?: string;
  type: string;
  cena: string;
  kategorija: string;
  seller: string;
  opis?: string;
};

function App() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [filters, setFilters] = useState<Filters>({});

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  // Fetch ads dynamically
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ads"));
        const adsData: Ad[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Ad, "id">; // Exclude `id` from the type
          return { id: doc.id, ...data }; // Add `id` explicitly
        });
  
        // Fetch ads.json as a fallback
        const response = await fetch("/ads.json");
        const localAds: Ad[] = await response.json();
  
        // Merge Firestore ads with ads.json, using local ads for missing images
        const mergedAds = adsData.map((ad) => {
          if (!ad.imgSrc || ad.imgSrc.startsWith("blob:")) {
            const fallbackAd = localAds.find((localAd) => localAd.naslov === ad.naslov);
            if (fallbackAd) {
              ad.imgSrc = fallbackAd.imgSrc; // Use the local ad's image URL
            }
          }
  
          return ad;
        });
  
        // Apply filters
        const filteredAds = mergedAds.filter((ad) => {
          console.log("filters: ", filters.vrsta);
          console.log("ad: ", ad.type);

          if (filters.kategorija && ad.kategorija !== filters.kategorija) return false;
          if (filters.vrsta && filters.vrsta !== "" && ad.type !== filters.vrsta) return false;
          if (filters.od && filters.od !== "" && !ad.seller.toLowerCase().includes(filters.od.toLowerCase())) return false;
          return true;
        });
  
        setAds(filteredAds); // Update the ads state with the filtered ads
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
  
    fetchAds();
  }, [filters]); // Add filters as a dependency
  
  const onSelectAdd = () => {
    
  }


  return (
  <AuthProvider>
    <Router>
      <div className="d-flex" style={{ minHeight: "100vh", minWidth: "100vh", backgroundColor: '#343a40',overflowY: "hidden", overflowX: "hidden" }}>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <Topbar>UŠ</Topbar>
                <SideBar onApplyFilters={handleApplyFilters}>Možnosti</SideBar>
              </>
            }
          />
        </Routes>

        <div className="main-content" style={{overflowY: "hidden", overflowX: "hidden" }}>
          <Routes>
            <Route
              path="/"
              element={
                <div className="d-flex oglas-area" style={{minHeight: "100vh" }}>
                  {ads.map((ad, index) => (
                    <Oglas
                      key={index}
                      naslov={ad.naslov}
                      imgSrc={ad.imgSrc}
                      seller={ad.seller}
                      type={ad.type}
                      kategorija={ad.kategorija}
                      cena={ad.cena}
                      opis={ad.opis}
                    />
                  ))}
                </div>
              }
            />         
            <Route path="/NovOglas" element={<NovOglas />} />
            <Route path="/SelectedOglas" element={<SelectedOglas />} />
            <Route path="/MojaSporocila" element={<MojaSporocila />} />
            <Route path="/MojiOglasi" element={<MojiOglasi />} />
            <Route path="/PredstavitevAplikacije" element={<PredstavitevAplikacije />} />
          </Routes>
        </div>       
      </div>
      <div style={{display: "flex"}}>
        <div className="fakeSidebar bg-dark" style={{display: "flex"}}></div>
        <div className="fakeBackground"></div>
      </div>
    </Router>
  </AuthProvider>
  );
}

export default App;