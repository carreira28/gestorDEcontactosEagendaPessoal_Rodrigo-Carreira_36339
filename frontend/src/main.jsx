import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registo from "./pages/Registo";
import Grupos from "./pages/Grupos";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registo" element={<Registo />} />
        <Route path="/grupos" element={<Grupos />} />
        <Route path="/" element={<Navigate to="/grupos" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);