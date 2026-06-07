import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Groups from "./pages/Groups";
import Contacts from "./pages/Contacts";
import Reminders from "./pages/Reminders";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:id" element={<Contacts />} />
        <Route path="/contacts/:contactoId/reminders" element={<Reminders />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);