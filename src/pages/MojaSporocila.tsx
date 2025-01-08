import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase"; // Assuming db is already initialized
import { getUser } from "../authUtils";
import { collection, query, where, getDocs } from "firebase/firestore";

const MojaSporocila = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const user = getUser();
        const mojEmail = user.email;

        if (mojEmail) {
          const usersRef = collection(db, "sporocila");
          const q = query(usersRef, where("prejemnik", "==", mojEmail));

          const querySnapshot = await getDocs(q);

          const messagesArray: any[] = [];
          querySnapshot.forEach((doc) => {
            messagesArray.push(doc.data());
          });

          setMessages(messagesArray); 
        } else {
          setError("User not logged in");
        }
      } catch (err) {
      }
    };

    fetchMessages();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div style={{overflow: "hidden", width: '1000px', height: '100%', marginLeft: '10%', marginTop: "3%" }}>
      <h1 style={{marginBottom: "3%"}}>Moja sporočila</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {messages.length > 0 ? (
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <p style={{color: "white"}}><strong>OGLAS:</strong> {message.oglas}</p>
              <p style={{color: "white"}}><strong>Sender:</strong> {message.posiljatelj}</p>
              <p style={{color: "white"}}><strong>Message:</strong> {message.sporocilo}</p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
};

export default MojaSporocila;
