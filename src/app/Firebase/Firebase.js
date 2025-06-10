// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ2d5qseFeuw3c2UXkDvCiKcGjUMIqZJo",
  authDomain: "my-bank--app.firebaseapp.com",
  projectId: "my-bank--app",
  storageBucket: "my-bank--app.firebasestorage.app",
  messagingSenderId: "356518996946",
  appId: "1:356518996946:web:6ffb7f0e57e0d590c5f60b",
  measurementId: "G-QKDQYWQPJ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth } from "./firebaseAuth"; // Assuming you have your auth instance imported
import { db } from "./firebaseFirestore"; // Assuming you have your firestore instance imported

// Function to create a new user and initialize their data in Firestore
async function createNewUserWithData(email, password, initialDisplayName) {
  try {
    // 1. Create the user account using Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user; // This is the authenticated user object

    // Get the unique user ID
    const userId = user.uid;

    // Optional: Update the user's profile in Authentication
    await updateProfile(user, {
      displayName: initialDisplayName,
      // photoURL: "..." // maybe add a default photo
    });

    // 2. Initialize the user's data in Firestore using their UID as the document ID
    // We'll create a document in the 'users' collection with the UID
    const userDocRef = doc(db, "users", userId);

    // Define the initial data structure (your "schema" for this user's document)
    const initialUserData = {
      displayName: initialDisplayName,
      email: user.email, // You might store email here for easy lookup, but Auth is source of truth
      createdAt: new Date(), // Timestamp of creation
      // Here's your array to hold other objects!
      myListOfStuff: [
        { id: "item1", name: "First Item", value: 10 },
        // You can start with an empty array [] or some initial objects
      ],
      settings: {
        theme: "light",
      },
      // ... other user-specific fields you need
    };

    // Set the document in Firestore
    await setDoc(userDocRef, initialUserData);

    console.log("New user created and data initialized in Firestore:", userId);
    return user; // Return the created user object
  } catch (error) {
    console.error("Error creating new user or initializing data:", error);
    // Handle specific errors (e.g., email already in use)
    throw error; // Re-throw the error after logging
  }
}

// Example usage:
// createNewUserWithData("testuser@example.com", "securepassword123", "Test User");
