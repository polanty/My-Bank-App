// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
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
// const analytics = getAnalytics(app);

const db = getFirestore(app);

//Adding a collection to my application using this function provided by firestore
// Let's add a new user document to a collection called 'users'
export async function addNewUserToCollection(userData) {
  try {
    // Get a reference to the 'users' collection
    const usersCollectionRef = collection(db, "users");

    // Add a new document with a generated ID to the 'users' collection
    const docRef = await addDoc(usersCollectionRef, userData);

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Example usage:
// addNewUser({ name: "Alice Smith", email: "alice.smith@example.com" });

export const auth = getAuth(app);

// Function to create a new user and initialize their data in Firestore
export async function createNewUserWithData(
  email,
  password,
  initialDisplayName
) {
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

export async function signInUserUsingEmailandPassword(email, password) {
  try {
    const userdetails = await signInWithEmailAndPassword(auth, email, password);

    const user = userdetails.user;

    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorCode, errorMessage);

    throw error;
  }
}

export async function signUserOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
}

export const createUserProfile = async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      role: "user", // default role
      createdAt: serverTimestamp(),
    });
    console.log("New user profile created");
  } else {
    console.log("User already exists");
  }
};

export async function createNewUserWithDataTrial(
  email,
  password,
  initialDisplayName
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: initialDisplayName,
    });

    await createUserDocument(user);

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
