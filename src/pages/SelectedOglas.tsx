import React from 'react'
import { useLocation } from "react-router-dom";




export const SelectedOglas = () => {
    const location = useLocation();
    const { naslov, imgSrc, opis, seller, type, kategorija, cena } = location.state || {};
  
    return (
      <div className='SelectedCont'>
        <div className='SelectedCard'>
          <img src={imgSrc} alt={"slika ni na voljo"} className='SelectedImage' />
          <div className='SelectedDet'>
            <h1 className='SelectedTit'>{naslov || "Oglas ni bil izbran!"} </h1>     
            <p className='SelectedText'>
              <strong>Kategorija:</strong> {" "}
              <span className='highlight'>{kategorija || ""}</span>
            </p>
            <p className='SelectedText'>
              <strong>Tip:</strong>{" "}
              <span className='highlight'>{type || ""}</span>
            </p>
            <p className='SelectedText'>
              <strong>Opis:</strong> {" "}
              <span className='highlight'>{opis || ""}</span>
            </p>
            <p className='SelectedText'>
              <strong>Prodajalec:</strong> {" "}
              <span className='highlight'>{seller || "anon"}</span>
            </p>
            <h2 className='SelectedCena'>
              <strong className='SelectedTit'>Cena:</strong> {" "}
              <span className='highlight'>{cena || "po dogovoru"}</span>
            </h2>
          </div>
        </div>
      </div>
    );
  };
  
  export default SelectedOglas;

  