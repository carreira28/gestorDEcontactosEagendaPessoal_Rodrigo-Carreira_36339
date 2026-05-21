import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { request } from "../api/api";

export default function Grupos() {
  const navigate = useNavigate();
  const [grupos, setGrupos] = useState([]);
  const [lembretes, setLembretes] = useState([]);
  const [novoNome, setNovoNome] = useState("");
  const [editando, setEditando] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarGrupos();
    carregarLembretes(); 
  }, []);

  const carregarLembretes = async () => {
    try {
      const data = await request("GET", "/lembrete/proximos/7dias");
      setLembretes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const carregarGrupos = async () => {
    try {
      const data = await request("GET", "/group");
      setGrupos(data);
    } catch (err) {
      setErro(err.message);
    }
  };

  const criar = async () => {
    if (!novoNome.trim()) return;
    try {
      await request("POST", "/group", { nome: novoNome });
      setNovoNome("");
      carregarGrupos();
    } catch (err) {
      setErro(err.message);
    }
  };

  const guardar = async (id) => {
    try {
      await request("PUT", `/group/${id}`, { nome: editando.nome });
      setEditando(null);
      carregarGrupos();
    } catch (err) {
      setErro(err.message);
    }
  };

  const eliminar = async (id) => {
    if (!confirm("Tens a certeza?")) return;
    try {
      await request("DELETE", `/group/${id}`);
      carregarGrupos();
    } catch (err) {
      setErro(err.message);
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

        <button className="btn btn-danger" onClick={logout} style={{ marginTop: "auto" }}>
          Sair
        </button>
      </aside>

      <main className="conteudo">
        <h2 style={{ marginBottom: "1.5rem" }}>Grupos</h2>

        {erro && <p className="erro">{erro}</p>}

        <div className="card" style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="Nome do novo grupo..."
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
          />
          <button className="btn btn-primary" onClick={criar}>Criar</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {grupos.length === 0 && <p>Nenhum grupo criado.</p>}
          {grupos.map((g) => (
            <div key={g.id} className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {editando?.id === g.id ? (
                <>
                  <input
                    value={editando.nome}
                    onChange={(e) => setEditando({ ...editando, nome: e.target.value })}
                    style={{ flex: 1 }}
                  />
                  <button className="btn btn-primary" onClick={() => guardar(g.id)}>Guardar</button>
                  <button className="btn" onClick={() => setEditando(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: "1rem" }}>{g.nome}</span>
                  <button className="btn btn-primary" onClick={() => navigate(`/grupos/${g.id}`)}>
                    Ver Contactos
                  </button>
                  <button className="btn btn-primary" onClick={() => setEditando(g)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => eliminar(g.id)}>Eliminar</button>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}