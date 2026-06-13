import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api/api";

export default function Erro() {

  const navigate = useNavigate();

return (
    <div className="layout">
      <main className="conteudo not-found-page">
        <div className="not-found-container">
          <span className="not-found">404</span>
          <h2>Página não encontrada</h2>
          <button className="btn btn-danger" onClick={() => navigate("/groups")} style={{ marginTop: "auto" }}>
            Voltar para os Grupos
          </button>
        </div>
      </main>
    </div>
  );
}