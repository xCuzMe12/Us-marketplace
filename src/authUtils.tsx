import { db } from "./firebase";
import { getDocs, collection, query, where, addDoc } from "firebase/firestore"; // Import required Firestore methods


export const isLoggedIn = () => {
  return sessionStorage.getItem("isLoggedIn") === "true";
};

export const getUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logInAsk = () => {
  return "Prijavite se!";
};

type NewUser = {
  displayName: string;
  email: string;
  editor: boolean;
};

export const addUserToDb = async (user: { displayName: string; email: string }) => {
  try {
    const usersRef = collection(db, "users");
    
    // Check if a user with the given email already exists
    const q = query(usersRef, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Prepare the new user data
      const newUser: NewUser = {
        displayName: user.displayName,
        email: user.email,
        editor: false,
      };

      // Add the new user to the "users" collection
      await addDoc(usersRef, newUser); 
      console.log("User added to database:", user.email);
    } else {
      console.log("User already exists in the database:", user.email);
    }
  } catch (error) {
    console.error("Error adding user to database:", error);
  }
};
