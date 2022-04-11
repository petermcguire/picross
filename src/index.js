import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
// import App from './App';
import Settings from './components/Settings/Settings';
import Game from './components/Game/Game';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Settings />} />
      <Route path="/game/:dim" element={<Game />} />
    </Routes>
  </BrowserRouter>,
);