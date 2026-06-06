import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { request } from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await request("POST", "/auth/signin", form);
      localStorage.setItem("token", res.token);
      navigate("/groups");
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
    }
  };

return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Bem-vindo</h2>
      <br></br>
      {error && <p className="erro">{error}</p>}
      <form onSubmit={handleSubmit}>
        <span>Email</span>
        <input name="email" type="email" placeholder="Exemplo@gmail.com" onChange={handleChange} required />
        
        <span>Password</span>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Entrar</button>
      </form>
      <p className="link-texto">Não tens conta? <Link to="/register">Regista-te</Link></p>
    </div>
  </div>
);
}