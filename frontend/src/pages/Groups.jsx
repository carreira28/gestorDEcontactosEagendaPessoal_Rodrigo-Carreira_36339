import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api/api";

export default function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadGroups();
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const data = await request("GET", "/lembrete/proximos/7dias");
      setReminders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadGroups = async () => {
    try {
      const data = await request("GET", "/group");
      setGroups(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const create = async () => {
    if (!newName.trim()) return;
    try {
      await request("POST", "/group", { nome: newName });
      setNewName("");
      loadGroups();
    } catch (err) {
      setError(err.message);
    }
  };

  const save = async (id) => {
    try {
      await request("PUT", `/group/${id}`, { nome: editing.nome });
      setEditing(null);
      loadGroups();
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminate = async (id) => {
    if (!confirm("Tens a certeza?")) return;
    try {
      await request("DELETE", `/group/${id}`);
      loadGroups();
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
        <button className="btn btn-danger" onClick={logout} style={{ marginTop: "auto" }}>
          Sair
        </button>
      </aside>

      <main className="conteudo">
        <h2 style={{ marginBottom: "1.5rem" }}>Grupos</h2>

        {error && <p className="erro">{error}</p>}

        <div className="card" style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="Nome do novo grupo..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={create}>Criar</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {groups.length === 0 && <p>Nenhum grupo criado.</p>}
          {groups.map((g) => (
            <div key={g.id} className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {editing?.id === g.id ? (
                <>
                  <input
                    value={editing.nome}
                    onChange={(e) => setEditing({ ...editing, nome: e.target.value })}
                    style={{ flex: 1 }}
                  />
                  <button className="btn btn-primary" onClick={() => save(g.id)}>Guardar</button>
                  <button className="btn" onClick={() => setEditing(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: "1rem" }}>{g.nome}</span>
                  <button className="btn btn-primary" onClick={() => navigate(`/groups/${g.id}`)}>
                    Ver Contactos
                  </button>
                  <button className="btn btn-primary" onClick={() => setEditing(g)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => eliminate(g.id)}>Eliminar</button>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}