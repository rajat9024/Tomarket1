// src/main.jsx (for Vite) or src/index.js (for Create React App)
import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import App from './App.jsx';
import './index.css'; // Import global CSS including Bootstrap

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// For older React (e.g., Create React App without React 18 updates):
/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; // If CRA includes this

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
