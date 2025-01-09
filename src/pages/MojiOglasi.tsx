import React, { useState, useEffect } from "react";
import { query, getDocs, collection, where, DocumentData, deleteDoc, doc  } from "firebase/firestore";
import { db } from "../firebase";
import { getUser } from "../authUtils";
import { MojOglas } from "../components/MojOglas";

 const MojiOglasi = () => {
  const user = getUser();
  const mojIme = user.displayName;
  const [ads, setAds] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      const usersRef = collection(db, "ads");
      const q = query(usersRef, where("seller", "==", mojIme));
      const querySnapshot = await getDocs(q);
      
      // Include the document ID with the ad data
      const adsData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,  
      }));
      
      setAds(adsData);
    };

    fetchAds();
  },[mojIme])


  const izbrisiOglas = async (index: number): Promise<void> => {
    const adToDelete = ads[index];
    const adId = adToDelete?.id;
  
    if (!adId) {
      console.error("Ad ID is undefined or invalid");
      return;
    }
  
    try {
      // Delete the document from Firestore using the document ID
      await deleteDoc(doc(db, "ads", adId)); 
  
      // Update the UI by filtering out the deleted ad
      setAds(ads.filter((ad, i) => i !== index));
    } catch (error) {
      console.error("Error deleting ad: ", error);
    }
  };
  
  return (
    <div style={{ overflow: "hidden", width: '1000px', height: '100%', marginLeft: '10%', marginTop: "3%" }}>
      <h1 style={{ marginBottom: "3%" }}>Moji Oglasi</h1>
      
      <div className="d-flex oglas-area" style={{minHeight: "100vh" }}>
        {ads.map((ad, index) => (
          <MojOglas
            key={index}
            naslov={ad.naslov}
            imgSrc={ad.imgSrc}
            seller={ad.seller}
            type={ad.type}
            kategorija={ad.kategorija}
            cena={ad.cena}
            opis={ad.opis}
            onDelete={() => izbrisiOglas(index)}
          />
        ))}
      </div>
      
    </div>
  );
};

export default MojiOglasi; 