// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FB_ApiKey,
  authDomain: process.env.FB_AuthDomain,
  projectId: process.env.FB_ProjectId,
  storageBucket: "react-file-d4c3b.appspot.com",
  messagingSenderId: process.env.FB_MessageID,
  appId: process.env.FB_AppID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export default app;
