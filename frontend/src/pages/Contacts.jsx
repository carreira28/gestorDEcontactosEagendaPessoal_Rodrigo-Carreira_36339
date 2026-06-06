import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../api/api";

export default function Contacts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadContacts();
    loadReminders();
  }, [id]);

  const loadReminders = async () => {
    try {
      const data = await request("GET", "/lembrete/proximos/7dias");
      setReminders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadContacts = async () => {
    try {
      const data = await request("GET", `/contacto/search?groupId=${id}`);
      setContacts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const create = async () => {
    if (!newName.trim()) return;
    try {
      await request("POST", "/contacto", { nome: newName });
      setNewName("");
      loadContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>Lembretes para os próximos 7 dias</h1>
        <div style={{ marginTop: "2rem" }}>
          {reminders.length === 0 && (
            <p style={{ fontSize: "0.8rem", color: "#a0aec0" }}>Sem lembretes.</p>
          )}
          {reminders.map((l) => (
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
        <button className="btn btn-danger" onClick={() => navigate("/groups")} style={{ marginTop: "auto" }}>
          Voltar
        </button>
      </aside>

      <main className="conteudo">
        <h2 style={{ margin: "1.5rem 0" }}>Contactos do Grupo</h2>

        {error && <p className="erro">{error}</p>}

        <div className="card" style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="Nome do novo contacto..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={create}>Criar</button>
        </div>

        {contacts.length === 0 && <p>Nenhum contacto neste grupo.</p>}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {contacts.map((c) => (
            <div key={c.id} className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {c.foto && (
                <img
                  src={c.foto}
                  alt={c.nome}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                    border: "2px solid #e2e8f0",
                  }}
                />
              )}
              <div>
                <strong>{c.nome}</strong>
                <p>{c.email}</p>
                <p>{c.telefone}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}