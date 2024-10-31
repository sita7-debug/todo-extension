// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Popup from './popup';
import 'font-awesome/css/font-awesome.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
