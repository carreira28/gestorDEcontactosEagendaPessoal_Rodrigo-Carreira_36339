import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../api/api";
import iconProfile from "../../photos/iconprofile.jpg";

export default function Reminders() {
  const { contactoId } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [sidebarReminders, setSidebarReminders] = useState([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [newReminder, setNewReminder] = useState({ nome: "", descricao: "", data: "" });

  useEffect(() => {
    loadContact();
    loadReminders();
    loadSidebarReminders();
  }, [contactoId]);

  const loadContact = async () => {
    try {
      const data = await request("GET", `/contacto/${contactoId}`);
      setContact(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadReminders = async () => {
    try {
      const data = await request("GET", `/lembrete/contacto/${contactoId}`);
      setReminders(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadSidebarReminders = async () => {
    try {
      const data = await request("GET", "/lembrete/proximos/7dias");
      setSidebarReminders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setNewReminder({ ...newReminder, [e.target.name]: e.target.value });
  };

  const create = async () => {
    if (!newReminder.nome.trim() || !newReminder.data) return;
    try {
      await request("POST", "/lembrete", {
        ...newReminder,
        contactoId: Number(contactoId),
      });
      setNewReminder({ nome: "", descricao: "", data: "" });
      loadReminders();
      loadSidebarReminders();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditChange = (e) => {
    setEditing({ ...editing, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      await request("PUT", `/lembrete/${editing.id}`, {
        nome: editing.nome,
        descricao: editing.descricao,
        data: editing.data,
      });
      setEditing(null);
      loadReminders();
      loadSidebarReminders();
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminate = async (reminderId) => {
    if (!confirm("Tens a certeza que queres eliminar este lembrete?")) return;
    try {
      await request("DELETE", `/lembrete/${reminderId}`);
      loadReminders();
      loadSidebarReminders();
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div style={{ marginTop: "2rem" }}>
        {contact && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <h1 style={{ margin: 0 }}>Lembretes de:</h1> 
              <h2> {contact.nome}</h2>
            </div>
          </div>
        )}
        </div>
        <button className="btn btn-danger" onClick={() => navigate(-1)} style={{ marginTop: "auto" }}>
          Voltar
        </button>
      </aside>

      <main className="conteudo">


        {error && <p className="erro">{error}</p>}

        <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <input
            name="nome"
            type="text"
            placeholder="Nome"
            value={newReminder.nome}
            onChange={handleChange}
            style={{ flex: 2, minWidth: 150 }}
          />
          <input
            name="descricao"
            type="text"
            placeholder="Descrição (opcional)"
            value={newReminder.descricao}
            onChange={handleChange}
            style={{ flex: 2, minWidth: 150 }}
          />
          <input
            name="data"
            type="date"
            value={newReminder.data}
            onChange={handleChange}
            style={{ flex: 1, minWidth: 140 }}
          />
          <button className="btn btn-primary" onClick={create} style={{ flexShrink: 0 }}>
            Criar
          </button>
        </div>

        {editing && (
          <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap", border: "2px solid #667eea" }}>
            <input
              name="nome"
              type="text"
              placeholder="Nome"
              value={editing.nome}
              onChange={handleEditChange}
              style={{ flex: 2, minWidth: 150 }}
            />
            <input
              name="descricao"
              type="text"
              placeholder="Descrição (opcional)"
              value={editing.descricao || ""}
              onChange={handleEditChange}
              style={{ flex: 2, minWidth: 150 }}
            />
            <input
              name="data"
              type="date"
              value={formatDateForInput(editing.data)}
              onChange={handleEditChange}
              style={{ flex: 1, minWidth: 140 }}
            />
            <button className="btn btn-primary" onClick={saveEdit} style={{ flexShrink: 0 }}>Guardar</button>
            <button className="btn" onClick={() => setEditing(null)} style={{ flexShrink: 0 }}>Cancelar</button>
          </div>
        )}

        {reminders.length === 0 && <p>Sem lembretes para este contacto.</p>}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {reminders.map((l) => (
            <div key={l.id} className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ flex: 1 }}>
                <strong>{l.nome}</strong>
                {l.descricao && <p style={{ color: "#4a5568" }}>{l.descricao}</p>}
                <p style={{ color: "#718096", fontSize: "0.85rem" }}>
                  {new Date(l.data).toLocaleDateString("pt-PT")}
                </p>
              </div>
              <button className="btn btn-primary" onClick={() => setEditing(l)}>Editar</button>
              <button className="btn btn-danger" onClick={() => eliminate(l.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}