import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api/api";

export default function Groups() {

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="layout">

      <main className="conteudo">
        <h2 style={{ display: "flex", 
          justifyContent: "center", 
          alignItems: "center" }}>ERRO</h2>
      </main>
    </div>
  );
}