import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";


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
    onApplyFilters(filters); // Send filters to App.tsx
    setShowFilters(false); // Close filter menu
  };

  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/NovOglas"); // Navigate to /NovOglas when button is clicked
  };

  return (
    <div className="bg-dark list-group sidebarOut">
      <h5 style={{ color: "#780606", paddingLeft: "10px" }}>{children}</h5>
      <ul className="list-unstyled" style={{ marginTop: "3vh" }}>
        <li
          className="bg-dark my-2 d-flex align-items-center list-group-item list-group-item-action sidebar"
          onClick={handleButton}
        >
          Objavi oglas
        </li>
        <li className="bg-dark my-2 d-flex align-items-center list-group-item list-group-item-action sidebar">
          Moji oglasi
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