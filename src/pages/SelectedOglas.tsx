import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { getUserByName } from "../authUtils";

export const SelectedOglas = () => {
  const location = useLocation();
  const { naslov, imgSrc, opis, seller, type, kategorija, cena } = location.state || {};

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [ownerEmail, setOwnerEmail] = useState<string | null>(null); 

  // Get the seller's email asynchronously
  const getSellerEmail = async (seller: string) => {
    try {
      const sellerEmail = await getUserByName(seller); 
      if (sellerEmail) {
        console.log("Seller Email:", sellerEmail);
        setOwnerEmail(sellerEmail);  
      } else {
        console.log("Seller not found.");
        setOwnerEmail(null);
      }
    } catch (error) {
      console.error("Error fetching seller info:", error);
      setOwnerEmail(null);
    }
  };

  // Fetch seller's email when component mounts
  React.useEffect(() => {
    if (seller) {
      getSellerEmail(seller);
    }
  }, [seller]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!ownerEmail) {
      setStatus("Owner email not available.");
      return;
    }

    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: ownerEmail, message }),
      });

      if (response.ok) {
        setStatus('Message successfully sent!');
        setMessage('');
      } else {
        setStatus('Error sending the message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error sending the message. Please try again.');
    }
  };

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

      {/* Send a Message Form */}
      <div className='SendMessageForm'>
        <h3>Pošlji sporočilo lastniku</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className='MessageInput'
            placeholder='Tukaj pustite sporočilo...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type='submit' className='SendButton'>
            Send Message
          </button>
        </form>
        {status && <p className='StatusMessage'>{status}</p>}
      </div>
    </div>
  );
};

export default SelectedOglas;
