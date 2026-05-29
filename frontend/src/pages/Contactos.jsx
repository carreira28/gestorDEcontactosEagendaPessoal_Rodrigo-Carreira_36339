import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../api/api";

export default function Contactos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contactos, setContactos] = useState([]);
  const [lembretes, setLembretes] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarContactos();
    carregarLembretes();
  }, [id]);

  const carregarLembretes = async () => {
    try{
    const data = await request("GET", "/lembrete/proximos/7dias");
    setLembretes(data);
    }catch (err) {
        console.error(err);
    }
  };

  const carregarContactos = async () => {
    try {
      const data = await request("GET", `/contacto/search?groupId=${id}`);
      setContactos(data);
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>Lembretes para os próximos 7 dias</h1>
        <div style={{ marginTop: "2rem" }}>
          {lembretes.length === 0 && (
            <p style={{ fontSize: "0.8rem", color: "#a0aec0" }}>Sem lembretes.</p>
          )}
          {lembretes.map((l) => (
            <div key={l.id} style={{
              background: "#ebf4ff",
              borderRadius: 8,
              padding: "0.5rem 0.75rem",
              marginBottom: "0.5rem",
              fontSize: "0.82rem"
            }}>
              <strong>{l.nome}</strong>
              <p style={{ color: "#718096" }}>{new Date(l.data).toLocaleDateString("pt-PT")}</p>
            </div>
          ))}
        </div>

        <button className="btn btn-danger" onClick={() => navigate("/grupos")} style={{ marginTop: "auto" }}>
          Voltar
        </button>
      </aside>
      <main className="conteudo">
        <h2 style={{ margin: "1.5rem 0" }}>Contactos do Grupo</h2>

        {erro && <p className="erro">{erro}</p>}

        {contactos.length === 0 && <p>Nenhum contacto neste grupo.</p>}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {contactos.map((c) => (
            <div key={c.id} className="card">
              <strong>{c.nome}</strong>
              <p>{c.email}</p>
              <p>{c.telefone}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}