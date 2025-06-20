// "use client";

// import React, { useEffect } from "react";
// import { auth } from "../../Firebase/Firebase";
// import * as firebaseui from "firebaseui";
// import "firebaseui/dist/firebaseui.css";
// import uiConfig from "../FirebaseSignIn/firebaseUIConfig";
// import { onAuthStateChanged } from "firebase/auth";
// import { createUserProfile } from "../../Firebase/Firebase";

// let ui: firebaseui.auth.AuthUI | undefined = undefined;

// export default function FirebaseAuthUI() {
//   useEffect(() => {
//     if (!ui) {
//       ui = new firebaseui.auth.AuthUI(auth);
//     }

//     ui.start("#firebaseui-auth-container", uiConfig);

//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         await createUserProfile(user); // create Firestore record
//       }
//     });

//     return () => {
//       ui?.reset();
//       unsubscribe();
//     };
//   }, []);

//   return <div id="firebaseui-auth-container" />;
// }
