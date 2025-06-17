// lib/firebaseUiConfig.js
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

const uiConfig = {
  signInSuccessUrl: "/", // Redirect URL after login
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: "/terms",
  privacyPolicyUrl: "/privacy",
};

export default uiConfig;
