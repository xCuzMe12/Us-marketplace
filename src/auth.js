/* Import Firebase modules
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "./firebase";  // Ensure you have db exported correctly

function googleLogin() {
  const auth = getAuth();  // Get the auth instance
  const provider = new GoogleAuthProvider();  // Initialize Google provider

  signInWithPopup(auth, provider)  // Use signInWithPopup
    .then(result => {
      const user = result.user;
    })
    .catch(console.log);
}

export default googleLogin; */

import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;  // You can propagate the error or show a message to the user
  }
};


/*export const doSignOut = async () => {
  try {
    await signOut(auth); // Use the signOut method from firebase/auth
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};


export const doPasswordReset = (password) => {
  return sendPasswordResetEmail(auth, email);
}

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
}

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: '$(window.location.origin)/home',
  })
}*/