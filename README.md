# Gestor de Contactos e Agenda Pessoal

Aplicação de gestão de contactos pessoais com grupos, notas e um sistema simples de lembretes por data.

---

# Tecnologias utilizadas

# Backend
| Biblioteca | Versão | Função |
|---|---|---|
| express | ^5.2.1 | Framework HTTP |
| @prisma/client | ^7.8.0 | ORM para base de dados |
| prisma | ^7.8.0 | CLI e migrations |
| pg | ^8.20.0 | Driver PostgreSQL |
| jsonwebtoken | ^9.0.3 | Autenticação JWT |
| bcrypt | ^6.0.0 | Hash de passwords |
| multer | ^2.1.1 | Upload de ficheiros |
| cloudinary | ^1.41.3 | Armazenamento de imagens na cloud |
| multer-storage-cloudinary | ^4.0.0 | Integração multer + Cloudinary |
| cors | ^2.8.6 | Cross-Origin Resource Sharing |
| dotenv | ^17.4.2 | Variáveis de ambiente |
| morgan | ^1.10.1 | Logging de pedidos HTTP |
| nodemon | ^3.1.14 | Reinício automático em desenvolvimento |

# Frontend
| Biblioteca | Versão | Função |
|---|---|---|
| react | ^19.2.6 | Framework UI |
| react-dom | ^19.2.6 | Renderização DOM |
| react-router-dom | ^7.15.1 | Navegação entre páginas |
| axios | ^1.16.1 | Cliente HTTP |
| vite | ^8.0.12 | Bundler e servidor de desenvolvimento |

---

# Instalação e execução

# 1. Instalar dependências do backend
npm install

# 2. Criar as tabelas na base de dados
npx prisma migrate dev

# 3. Iniciar o backend
npm run dev


# 4. Instalar e iniciar o frontend

| cd frontend | npm install | npm run dev |