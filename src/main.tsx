import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';              
import './index.css';
import { Toaster } from 'react-hot-toast';


const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" />
  </React.StrictMode>
);



