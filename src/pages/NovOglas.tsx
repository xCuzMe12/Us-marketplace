import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase"; // Firebase Storage instance
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getUser } from "../authUtils";


export const NovOglas = () => {
  const [naslov, setNaslov] = useState("");
  const [type, setType] = useState("");
  const [kategorija, setKategorija] = useState("");
  const [cena, setCena] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [opis, setOpis] = useState("");
  //const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const user = getUser();
  const displayName = user.displayName;
  console.log(displayName);
  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as FileList);
  
    const readFilesAsBase64 = async (files: File[]): Promise<string[]> => {
      const base64Promises = files.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file); // Convert file to Base64
          })
      );
      return Promise.all(base64Promises);
    };
  
    readFilesAsBase64(files)
      .then((base64Images) => setImages(base64Images))
      .catch((error) => console.error("Error converting files to Base64:", error));
  };
  
  const navigate = useNavigate();

  const handleObjavi = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newAd = {
      naslov,
      imgSrc: images[0] || "", // Base64 string
      type,
      cena,
      kategorija: kategorija,
      seller: displayName,
      opis: opis,
    };
  
    try {
      // dodaj v Firestore
      await addDoc(collection(db, "ads"), newAd);
      console.log("Ad added to Firestore successfully!");
      navigate("/");
      location.reload();
    } catch (error) {
      console.error("Error adding ad:", error);
    }
  };
  
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{width: '1000px', backgroundColor: "#343a40", marginLeft: "10%", marginTop: "10%"}}
    >
      <form
        className="p-4 rounded shadow"
        style={{
          width: "100%",
          backgroundColor: "#343a40",
          minHeight: "100vh",
          minWidth: "70vh",
        }}
        onSubmit={handleObjavi}
      >
        <h3 className="text-center mb-4" style={{ color: "#b71c1c" }}>
          Objavi svoj oglas
        </h3>

        <div className="mb-3">
          <label
            htmlFor="title"
            className="form-label"
            style={{ color: "#980606" }}
          >
            Naslov oglasa
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="naslov"
            required
            value={naslov}
            onChange={(e) => setNaslov(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="price"
            className="form-label"
            style={{ color: "#980606" }}
          >
            Cena
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="100 €/g"
            required
            value={cena}
            onChange={(e) => setCena(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="description"
            className="form-label"
            style={{ color: "#980606" }}
          >
            Opis
          </label>
          <input
            type="text"
            id="opis"
            className="form-control"
            placeholder="Kvaliteten kokain iz..."
            required
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ color: "#980606" }}>
            Vrsta oglasa
          </label>
          <div className="d-flex">
            <div className="form-check" style={{ paddingRight: "15px" }}>
              <input
                className="form-check-input"
                type="radio"
                name="twoOptions"
                id="option1"
                value="produkt"
                onChange={() => setType("produkt")}
              />
              <label
                className="form-check-label"
                htmlFor="option1"
                style={{ color: "#b71c1c" }}
              >
                Produkt
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="twoOptions"
                id="option2"
                value="storitev"
                onChange={() => setType("storitev")}
              />
              <label
                className="form-check-label"
                htmlFor="option2"
                style={{ color: "#b71c1c" }}
              >
                Storitev
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ color: "#980606" }}>
            Kategorija
          </label>
          <select
            className="form-select"
            style={{ backgroundColor: "#343a40", color: "#b71c1c" }}
            onChange={(e) => setKategorija(e.target.value)}
          >
            <option value="ostalo">Ostalo</option>
            <option value="droge">Droge</option>
            <option value="orožije">Orožje</option>
            <option value="ljudje">Ljudje</option>
            <option value="organi">Organi</option>
            <option value="tehnika">Tehnika</option>
          </select>
        </div>

        <div className="mb-3">
          <label
            htmlFor="image"
            className="form-label"
            style={{ color: "#980606" }}
          >
            Izberi sliko
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div className="mb-3">
          {images.length > 0 && (
            <div className="image-preview mt-3">
              <h5 style={{ color: "#980606" }}>Slika:</h5>
              <div className="d-flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Uploaded Preview ${index + 1}`}
                    className="img-thumbnail"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-danger w-100">
          Objavi
        </button>
      </form>
    </div>
  );
};

export default NovOglas;