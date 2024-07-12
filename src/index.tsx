import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCn0CH1DpCV6fsW7Sv_5vuZ8h1aXRjgdeo",
  authDomain: "eds-mys.firebaseapp.com",
  projectId: "eds-mys",
  storageBucket: "eds-mys.appspot.com",
  messagingSenderId: "724864474316",
  appId: "1:724864474316:web:1ef78f0b4480285b8d7669",
  measurementId: "G-70B6T0S8D9",
  databaseURL: 'https://eds-mys-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase
const cong = initializeApp(firebaseConfig);
const analytics = getAnalytics(cong);
export default cong;
export const db: any = getFirestore(cong);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
