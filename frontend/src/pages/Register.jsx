import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { request } from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await request("POST", "/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Erro ao registar");
    }
  };

return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Criar conta</h2>
      <br></br>
      {error && <p className="erro">{error}</p>}
      <form onSubmit={handleSubmit}>
        <span>Nome</span>
        <input name="name" type="text" placeholder="Nome Completo" onChange={handleChange} required />
        <span>Email</span>
        <input name="email" type="email" placeholder="Exemplo@gmail.com" onChange={handleChange} required />
        <span>Password</span>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Registar</button>
      </form>
      <p className="link-texto">Já tens conta? <Link to="/login">Faz login</Link></p>
    </div>
  </div>
);
}