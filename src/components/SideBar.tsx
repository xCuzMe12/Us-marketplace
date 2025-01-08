import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { isLoggedIn, getUser, logInAsk } from "../authUtils";


type Filters = {
  kategorija: string;
  vrsta: string;
  od: string;
};

interface Props {
  children?: ReactNode;
  onApplyFilters: (filters: Filters) => void;
}

export const SideBar = ({ children = "", onApplyFilters }: Props) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    kategorija: "",
    vrsta: "",
    od: "",
  });

  const [error, setError] = useState("");

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    onApplyFilters(filters); 
    setShowFilters(false); 
  };

  const navigate = useNavigate();

  const handleButton = () => {
    if (isLoggedIn()) {
      setError(""); 
      navigate("/NovOglas");
    } else {
      const errorMsg = logInAsk();
      setError(errorMsg);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  

  const handleMojiOglasi = () => {
    if (isLoggedIn()) {
      setError(""); 
      console.log("PRIKAZEM OGLASE");
    }
    else {
      const errorMsg = logInAsk();
      setError(errorMsg);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleMojaSporocila = () => {
    if (isLoggedIn()) {
      setError(""); 
      navigate("/MojaSporocila");



    }
    else {
      const errorMsg = logInAsk();
      setError(errorMsg);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }


  return (
<div className="bg-dark list-group sidebarOut" style={{ }}>
      <h5 style={{ color: "#780606", paddingLeft: "10px" }}>{children}</h5>
      <ul className="list-unstyled" style={{ marginTop: "3vh" }}>
        <li
          className="bg-dark my-2 d-flex align-items-center list-group-item list-group-item-action sidebar"
          onClick={handleButton}
        >
          Objavi oglas
        </li>
        <li className="bg-dark my-2 d-flex align-items-center list-group-item list-group-item-action sidebar"
        onClick={handleMojiOglasi}>
          Moji oglasi
        </li>
        <li className="bg-dark my-2 d-flex align-items-center list-group-item list-group-item-action sidebar"
        onClick={handleMojaSporocila}>
          Moja sporočila
        </li>
        <li
          className="bg-dark my-2 d-flex align-items-center list-group-item list-group-item-action sidebar"
          onClick={handleToggleFilters}
        >
          Filtriraj oglase
        </li>

        <li className="bg-dark my-2 d-flex align-items-center list-group-item list-group-item-action sidebar">
          Predstavitev aplikacije
        </li>
      </ul>
      {error && <h2 style={{ color: "#FFFFFF", paddingLeft: "10px", marginTop: "5%"}}>{error}</h2>}


      {/*filtri*/}

      {showFilters && (
        <div className="filter-menu bg-dark p-3">
          <h5>Filtriraj oglase</h5>
          <div className="mb-3">
            <label>Kategorija</label>
            <select
              name="kategorija"
              className="form-select"
              value={filters.kategorija}
              onChange={handleFilterChange}
            >
              <option value=""></option>
              <option value="droge">Droge</option>
              <option value="orožje">Orožje</option>
              <option value="ljudje">Ljudje</option>
              <option value="organi">Organi</option>
              <option value="tehnika">Tehnika</option>
              <option value="ostalo">Ostalo</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Produkt/Storitev</label>
            <select
              name="vrsta"
              className="form-select"
              value={filters.vrsta}
              onChange={handleFilterChange}
            >
              <option value=""></option>
              <option value="produkt">Produkt</option>
              <option value="storitev">Storitev</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Od</label>
            <input
              type="text"
              name="od"
              className="form-control"
              placeholder="ime prodajalca"
              value={filters.od}
              onChange={handleFilterChange}
            />
          </div>

          <button className="btn btn-secondary" onClick={applyFilters}>
            Uporabi filtre
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;