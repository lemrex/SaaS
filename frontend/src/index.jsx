// // src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './styles/index.css';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );



import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);