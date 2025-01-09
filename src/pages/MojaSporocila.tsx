import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase"; // Assuming db is already initialized
import { getUser } from "../authUtils";
import { collection, query, where, getDocs, writeBatch, doc, deleteDoc } from "firebase/firestore";
import { zapisiSporocilo } from "../sporocila";

const MojaSporocila = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [replies, setReplies] = useState<{ [id: string]: string }>({}); // Separate replies for each message
  const user = getUser();
  const mojEmail = user.email;

  const Odgovori = (id: string) => {
    const replyText = replies[id];
    if (replyText) {
      const message = messages.find((msg) => msg.id === id);
      if (message) {
        const recipientEmail = message.prejemnik; 
        console.log("moj email: " + mojEmail);
        console.log(`email do tistega ko posiljas: ` + recipientEmail);
        zapisiSporocilo("ODGOVOR",mojEmail, recipientEmail, replyText);
  
        // Clear the reply input field for the specific message after sending
        setReplies((prevReplies) => ({ ...prevReplies, [id]: "" }));
      }
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const messageRef = doc(db, "sporocila", id); // Get reference to the specific message
      await deleteDoc(messageRef); // Delete the message from Firestore
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id)); // Remove the message from state
      console.log(`Message with ID ${id} has been deleted`);
    } catch (error) {
      console.error("Error deleting message:", error);
      setError("Failed to delete message.");
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (mojEmail) {
          const usersRef = collection(db, "sporocila");
          const q = query(usersRef, where("prejemnik", "==", mojEmail));

          const querySnapshot = await getDocs(q);

          const messagesArray: any[] = [];
          const batch = writeBatch(db);

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            messagesArray.push({ id: doc.id, ...data });

            // Add update to batch to set jeNovo to false
            if (data.jeNovo) {
              batch.update(doc.ref, { jeNovo: false });
            }
          });

          setMessages(messagesArray);

          // Commit the batch to update all documents
          await batch.commit();
        } else {
          setError("User not logged in");
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages.");
      }
    };

    fetchMessages();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div style={{ overflow: "hidden", width: '1000px', height: '100%', marginLeft: '10%', marginTop: "3%" }}>
      <h1 style={{ marginBottom: "3%" }}>Moja sporočila</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {messages.length > 0 ? (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              {message.jeNovo && <p style={{ color: "red" }}><strong>NOVO SPOROČILO</strong></p>}
              {!message.jeNovo && <p style={{ color: "white" }}><strong>Staro sporočilo</strong></p>}
              <p style={{ color: "white" }}>
                <strong>Poslano ob:</strong>{" "}
                {message.casSporocila ? new Date(message.casSporocila.seconds * 1000).toLocaleString() : "Ni na voljo"}
              </p>
              {message.oglas === "ODGOVOR" ? (
                <p style={{ color: "red" }}><strong>ODGOVOR</strong></p>
              ) : (
                <p style={{ color: "white" }}><strong>OGLAS:</strong> {message.oglas}</p>
              )}
              <p style={{ color: "white" }}><strong>Pošiljatelj:</strong> {message.posiljatelj}</p>
              <p style={{ color: "white" }}><strong>Sporočilo:</strong> {message.sporocilo}</p>
              <div style={{ display: "flex", paddingRight: "10%", alignItems: "center", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Odgovorite tukaj..."
                  value={replies[message.id] || ""} // Use the reply specific to this message
                  onChange={(e) =>
                    setReplies((prevReplies) => ({ ...prevReplies, [message.id]: e.target.value }))
                  }
                  style={{ flex: "1", padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <button
                  onClick={() => Odgovori(message.id)}
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                  }}
                >
                  Odgovori
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => deleteMessage(message.id)}
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                  }}
                >
                  Izbriši
                </button>
              </div>
              <hr style={{ height: "5px", backgroundColor: "white", border: "none", marginRight: "30px" }} />
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
