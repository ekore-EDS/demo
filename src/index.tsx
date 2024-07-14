import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: "eds-mys.firebaseapp.com",
  projectId: "eds-mys",
  storageBucket: "eds-mys.appspot.com",
  messagingSenderId: "724864474316",
  appId: `${process.env.APP_ID}`,
  measurementId: "G-70B6T0S8D9",
  databaseURL: `${process.env.DATABASE_URL}`,
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
