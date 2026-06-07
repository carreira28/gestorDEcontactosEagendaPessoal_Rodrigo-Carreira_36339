import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../api/api";
import iconProfile from "../../photos/iconprofile.jpg";

export default function Contacts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState("");
  const [newContact, setNewContact] = useState({
  nome: "",
  email: "",
  telefone: "",
  notas: "",
  foto: null,
  fotoPreview: "",
});

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

  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewContact((prev) => ({
      ...prev,
      foto: file,
      fotoPreview: URL.createObjectURL(file),
    }));
  };

const create = async () => {
  if (!newContact.nome.trim()) return;
  try {
    const formData = new FormData();
    formData.append("nome", newContact.nome);
    formData.append("email", newContact.email);
    formData.append("telefone", newContact.telefone);
    formData.append("notas", newContact.notas);
    formData.append("groupId", id);
    if (newContact.foto) formData.append("foto", newContact.foto);

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:4242/contacto", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Erro ao criar contacto");

    setNewContact({ nome: "", email: "", telefone: "", notas: "", foto: null, fotoPreview: "" });
    loadContacts();
  } catch (err) {
    setError(err.message);
  }
};

  const eliminate = async (id) => {
    if (!confirm("Tens a certeza?")) return;
    try {
      await request("DELETE", `/contacto/${id}`);
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
        <h2 style={{ marginBottom: "1.5rem" }}>Contactos do Grupo</h2>

        {error && <p className="erro">{error}</p>}

        <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <img
            src={newContact.fotoPreview || iconProfile}
            alt="preview"
            style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "2px solid #e2e8f0", flexShrink: 0 }}
          />
          <label className="btn btn-primary" style={{ cursor: "pointer", flexShrink: 0 }}>
            <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
            Foto
          </label>
          <input
            name="nome"
            type="text"
            placeholder="Nome"
            value={newContact.nome}
            onChange={handleChange}
            style={{ flex: 1, minWidth: 120 }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={newContact.email}
            onChange={handleChange}
            style={{ flex: 1, minWidth: 120 }}
          />
          <input
            name="telefone"
            type="tel"
            placeholder="Telefone"
            value={newContact.telefone}
            onChange={handleChange}
            style={{ flex: 1, minWidth: 100 }}
          />
          <input
            name="notas"
            type="text"
            placeholder="Notas (Opcional)"
            value={newContact.notas}
            onChange={handleChange}
            style={{ flex: 2, minWidth: 120 }}
          />
          <button className="btn btn-primary" onClick={create} style={{ flexShrink: 0 }}>
            Criar
          </button>
        </div>

        {contacts.length === 0 && <p>Nenhum contacto neste grupo.</p>}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {contacts.map((c) => (
            <div key={c.id} className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                src={c.foto || iconProfile}
                alt={c.nome}
                style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "2px solid #e2e8f0" }}
              />
              <div>
                <strong>{c.nome}</strong>
                {c.email && <p>{c.email}</p>}
                {c.telefone && <p>{c.telefone}</p>}
                {c.notas && <p style={{ color: "#718096", fontSize: "0.85rem" }}>{c.notas}</p>}
              </div>
                  <button className="btn btn-danger" onClick={() => eliminate(g.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}