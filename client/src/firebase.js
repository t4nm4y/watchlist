import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC7VnM042rLsAxJIZzXXxruaBMJIcFzGXY",
  authDomain: "tkswatchlist.firebaseapp.com",
  projectId: "tkswatchlist",
  storageBucket: "tkswatchlist.appspot.com",
  messagingSenderId: "425988112263",
  appId: "1:425988112263:web:b38451f0d46d04c8169d22"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
