import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import cursor context provider
import { ContextProvider } from './context/Context'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <ContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextProvider>
);
