// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACpR692YTQWy7VXiKq9VQrLGIwNm4ESK0",
  authDomain: "auction-management-project.firebaseapp.com",
  projectId: "auction-management-project",
  storageBucket: "auction-management-project.firebasestorage.app",
  messagingSenderId: "47324941904",
  appId: "1:47324941904:web:51cdeae7d2e55c9a34cb55",
  measurementId: "G-PFRS20L7NC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);