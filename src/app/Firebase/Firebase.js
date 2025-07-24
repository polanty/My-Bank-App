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
  doc,
  setDoc,
  getDoc,
  where,
  getFirestore,
  query,
  collection,
  getDocs,
  runTransaction,
  arrayUnion,
  Timestamp,
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

const db = getFirestore(app);

export const auth = getAuth(app);

//Account object type

//Generating a unique account number based on the counter setting stored on the counter variable stored in firestore

export const generateUniqueAccountNumber = async () => {
  const counterRef = doc(db, "settings", "counters");

  try {
    const accountNumber = await runTransaction(db, async (transaction) => {
      const counterDoc = await transaction.get(counterRef);

      if (!counterDoc.exists()) {
        throw "Counter document does not exist!";
      }

      const current = counterDoc.data().lastAccountNumber || 1000000000;
      const next = current + 1;

      transaction.update(counterRef, { lastAccountNumber: next });

      return next;
    });

    return accountNumber.toString();
  } catch (e) {
    console.error("Failed to generate account number:", e);
    throw e;
  }
};

// Example usage:
// addNewUser({ name: "Alice Smith", email: "alice.smith@example.com" });

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

    const accountNumber = await generateUniqueAccountNumber();

    const transactions = [
      // You can start with an empty array [] or some initial objects
      {
        AccountNumber: 123456789,
        AccountName: "Abiola Tijani",
        type: "Credit",
        amount: 10000,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Abiola Tijani",
        type: "Credit",
        amount: 10000,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Abiola Tijani",
        type: "Credit",
        amount: 10000,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Abiola Tijani",
        type: "Credit",
        amount: 10000,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Abiola Tijani",
        type: "Credit",
        amount: 10000,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Abiola Tijani",
        type: "Credit",
        amount: 10000,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Mike",
        type: "debit",
        amount: 6000,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Daniel",
        type: "debit",
        amount: 800,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Abiola Tijani",
        type: "Credit",
        amount: 10000,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Onyinye",
        type: "debit",
        amount: 900,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Abiola Tijani",
        type: "Credit",
        amount: 10000,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Muyiwa",
        type: "debit",
        amount: 700,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Abiola Tijani",
        type: "Credit",
        amount: 10000,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Daniel",
        type: "debit",
        amount: 400,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Abiola Tijani",
        type: "Credit",
        amount: 10000,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Abiola Tijani",
        type: "Credit",
        amount: 10000,
        Date: new Date().toISOString(),
        description: "",
      },
      {
        AccountNumber: 123456789,
        AccountName: "Abiola Tijani",
        type: "Credit",
        amount: 10000,
        Date: new Date().toISOString(),
        description: "",
      },
    ];

    const bonus = 50000;

    const balance = bonus;

    // Define the initial data structure (your "schema" for this user's document)
    const initialUserData = {
      displayName: initialDisplayName,
      email: user.email, // You might store email here for easy lookup, but Auth is source of truth
      accountNumber,
      createdAt: new Date().toISOString(), // Timestamp of creation
      // Here's your array to hold other objects!
      Transactions: transactions,
      settings: {
        theme: "light",
      },
      isactive: true,
      Bonus: bonus,
      Balance: balance,
      // ... other user-specific fields you need
    };

    // Set the document in Firestore
    await setDoc(userDocRef, initialUserData);

    console.log("New user created and data initialized in Firestore:", userId);
    return {
      uid: userId,
      email: initialUserData.email,
      displayName: initialUserData.displayName,
      isactive: initialUserData.isactive,
    }; // Return the created user object
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

    const userId = user.uid;

    // Fetch additional user info from Firestore (assuming you store isactive there)
    const userDocRef = doc(db, "users", userId); // Firestore path: users/{uid}
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      const data = docSnap.data();

      // 🔁 Convert Firestore Timestamp fields to ISO strings for Redux compatibility
      const transactions = (data.Transactions || []).map((tx) => ({
        ...tx,
        Date:
          tx.Date instanceof Timestamp
            ? tx.Date.toDate().toISOString()
            : tx.Date ?? null,
      }));

      const initialUserData = {
        uid: userId,
        displayName: data.displayName || "",
        email: data.email || "",
        accountNumber: data.accountNumber,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : new Date().toISOString(), // fallback
        Transactions: transactions,
        settings: data.settings || { theme: "light" },
        isactive: data.isactive ?? true,
        Bonus: data.Bonus ?? 0,
        Balance: data.Balance ?? 0,
      };

      return { ...initialUserData };

      // return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
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

//Get one user Transaction based on the user id
export const getUserTransactions = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());

    const data = docSnap.data();

    // 🔁 Convert Firestore Timestamp fields to ISO strings for Redux compatibility
    const transactions = (data.Transactions || []).map((tx) => ({
      ...tx,
      Date:
        tx.Date instanceof Timestamp
          ? tx.Date.toDate().toISOString()
          : tx.Date ?? null,
    }));

    const initialUserData = {
      displayName: data.displayName || "",
      email: data.email || "",
      accountNumber: data.accountNumber,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(), // fallback
      Transactions: transactions,
      settings: data.settings || { theme: "light" },
      isactive: data.isactive ?? true,
      Bonus: data.Bonus ?? 0,
      Balance: data.Balance ?? 0,
    };

    return { ...initialUserData };

    // return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

//Query firestore to retreive unique account Number
export const getUserByAccountNumber = async (accountNumber) => {
  const usersRef = collection(db, "users"); // Your Firestore collection
  const q = query(usersRef, where("accountNumber", "==", accountNumber));

  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot);
  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return null;
  }

  // Since it's a unique field, assume only one match
  const doc = querySnapshot.docs[0];
  const data = doc.data();

  // 🔁 Convert Firestore Timestamp fields to ISO strings for Redux compatibility
  const transactions = (data.Transactions || []).map((tx) => ({
    ...tx,
    Date:
      tx.Date instanceof Timestamp
        ? tx.Date.toDate().toISOString()
        : tx.Date ?? null,
  }));

  const initialUserData = {
    uid: doc.id, // ✅ Add this line
    displayName: data.displayName || "",
    email: data.email || "",
    accountNumber: data.accountNumber,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : new Date().toISOString(), // fallback
    Transactions: transactions,
    settings: data.settings || { theme: "light" },
    isactive: data.isactive ?? true,
    Bonus: data.Bonus ?? 0,
    Balance: data.Balance ?? 0,
  };

  return { ...initialUserData };

  // return { id: doc.id, ...doc.data() };
};

export const addTransactionAndUpdateBalance = async (userId, newTx) => {
  const userRef = doc(db, "users", userId);

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);

      if (!userDoc.exists()) {
        throw new Error("User not found");
      }

      const userData = userDoc.data();
      let balance = userData.Balance ?? 0;

      //Check if the Amount is enough especially with the debit
      if (newTx.type.toLowerCase() === "debit" && newTx.amount > balance) {
        throw new Error(
          "You do Not have enough balance to perform this transaction"
        );
      }

      // Prepare new transaction with timestamp
      const newTransaction = {
        ...newTx,
        date: Timestamp.now(),
      };

      // Adjust balance
      if (newTx.type.toLowerCase() === "credit") {
        balance += newTx.amount;
      } else if (newTx.type.toLowerCase() === "debit") {
        balance -= newTx.amount;
      }

      // Update Firestore atomically
      transaction.update(userRef, {
        Balance: balance,
        Transactions: arrayUnion(newTransaction),
      });
    });

    console.log("Transaction added and balance updated.");
  } catch (e) {
    console.error("Transaction failed: ", e);
  }
};

export const transferFunds = async (
  senderId,
  receiverId,
  amount,
  description = "The money has gone through"
) => {
  if (senderId === receiverId) {
    throw new Error(
      "Unauthorized Transaction, you are unable to send money to yourself🤣"
    );
  }

  const senderRef = doc(db, "users", senderId);
  const receiverRef = doc(db, "users", receiverId);

  try {
    await runTransaction(db, async (transaction) => {
      const senderDoc = await transaction.get(senderRef);
      const receiverDoc = await transaction.get(receiverRef);

      if (!senderDoc.exists() || !receiverDoc.exists()) {
        throw new Error("Sender or receiver not found");
      }

      const senderData = senderDoc.data();
      const receiverData = receiverDoc.data();

      if (senderData.Balance < amount) {
        throw new Error("Insufficient funds");
      }

      // Create timestamp and serialize it
      const isoDate = Timestamp.now().toDate().toISOString();

      // Prepare transactions
      const debitTransaction = {
        amount,
        type: "debit",
        description: description || `Transfer to ${receiverData.displayName}`,
        Date: isoDate,
        counterparty: receiverData.displayName,
        counterpartyAccount: receiverData.accountNumber,
      };

      const creditTransaction = {
        amount,
        type: "credit",
        description: description || `Received from ${senderData.displayName}`,
        Date: isoDate,
        counterparty: senderData.displayName,
        counterpartyAccount: senderData.accountNumber,
      };

      //Check if the sender account is active or deactivated
      if (!senderData.isactive) {
        throw new Error(
          "Unable to perform this operation : Your account is Locked,\n please contact your Account Manager"
        );
      }

      // Update sender
      transaction.update(senderRef, {
        Balance: senderData.Balance - parseInt(amount),
        Transactions: arrayUnion(debitTransaction),
      });

      // Update receiver
      transaction.update(receiverRef, {
        Balance: receiverData.Balance + parseInt(amount),
        Transactions: arrayUnion(creditTransaction),
      });
    });

    console.log("Transfer successful");
  } catch (e) {
    console.error("Transfer failed: ", e.message);
    throw e;
  }
};

export const currencyConverter = async (from, to, amount) => {
  const CurrencyConverterKey = process.env.NEXT_PUBLIC_CURRENCY_CONVERTER;

  const url = `https://v6.exchangerate-api.com/v6/${CurrencyConverterKey}/pair/${from}/${to}/${amount}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.conversion_result; // This will return the converted amount
  } catch (error) {
    console.error("Currency conversion failed:", error);
    return null;
  }
};
