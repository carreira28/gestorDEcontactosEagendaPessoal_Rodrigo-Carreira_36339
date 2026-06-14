# Gestor de Contactos e Agenda Pessoal

Aplicação web de gestão de contactos pessoais com suporte a grupos, notas, upload de foto e um sistema de lembretes por data.

---

## Tecnologias utilizadas

### Backend
| Biblioteca | Versão |
|---|---|
| express | ^5.2.1 |
| @prisma/client | ^7.8.0 |
| prisma | ^7.8.0 |
| pg | ^8.20.0 |
| jsonwebtoken | ^9.0.3 |
| bcrypt | ^6.0.0 |
| multer | ^2.1.1 |
| cloudinary | ^1.41.3 |
| multer-storage-cloudinary | ^4.0.0 |
| cors | ^2.8.6 |
| dotenv | ^17.4.2 |
| morgan | ^1.10.1 |
| nodemon | ^3.1.14 |

### Frontend
| Biblioteca | Versão |
|---|---|
| react |
| react-dom | ^19.2.6 |
| react-router-dom | ^7.15.1 |
| vite | ^8.0.12 |

---

## Variáveis de ambiente

Cria um ficheiro `.env` na raiz do projeto com base no `.env.example`:

```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/nome_da_base
JWT_SECRET=o_teu_segredo
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## Instalação e execução

### Backend

```bash
# 1. Instalar dependências
npm install

# 2. Criar as tabelas na base de dados
npx prisma migrate dev

# 3. Iniciar o servidor
npm run dev
```

O servidor fica disponível em `http://localhost:4242`.

### Frontend

```bash
# 1. Entrar na pasta do frontend
cd frontend

# 2. Instalar dependências
npm install

# 3. Iniciar a aplicação
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`.
