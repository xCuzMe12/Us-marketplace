import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; 


export const zapisiSporocilo = async (oglas: string, senderEmail: string, receiverEmail: string, sporocilo: string) => {
  try {
    const usersRef = collection(db, "sporocila");

    const newMessage = {
      jeNovo: true,
      oglas: oglas || "Odgovor",
      posiljatelj: senderEmail, 
      prejemnik: receiverEmail, 
      sporocilo: sporocilo, 
      casSporocila: new Date() 
    };

    const docRef = await addDoc(usersRef, newMessage);


  } catch (error) {
    console.error("Error adding document: ", error);
  }
};