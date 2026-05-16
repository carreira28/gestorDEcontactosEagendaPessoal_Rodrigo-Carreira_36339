const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const path = require("path");
const fs = require("fs"); 
const multer = require('multer')

//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { PrismaClient } = require("@prisma/client");
const { withAccelerate } = require("@prisma/extension-accelerate");

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/photos", express.static("photos"));

const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'photos/');   
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)
    )}});
    const upload = multer({ storage });


app.get("/contacto" , async (req, res) => {
    const contactos = await prisma.Contacto.findMany();
    res.status(200).json(contactos);
});

app.get("/contacto/:id" , async (req, res) => {
    const contacto = await prisma.Contacto.findUnique({
        where: { id: req.params.id},
    });
    res.status(200).json(contacto);
});

app.post("/contacto", upload.single('foto') , async (req, res) => {
    const { nome, email, telefone, notas, groupId } = req.body;

    const existeEmail = await prisma.Contacto.findUnique({
        where: { email },
    });

    if (existeEmail) {
        return res.status(400).json({ message: "Email já existe" });
    }
    const newContact = await prisma.Contacto.create({
        data: { nome, email, telefone, notas, groupId, foto: req.file ? `/photos/${req.file.filename}` : null },
    });
    res.status(201).json(newContact);
});


//! Atualizar o PUT
app.put("/contacto/:id" , async (req, res) => {
    const { nome, email, telefone, notas, groupId } = req.body;
    const updatedContact = await prisma.Contacto.update({
        where: { id: req.params.id },
        //data: { nome, email, telefone, notas, groupId, foto: req.file ? },
    });
    res.status(200).json(updatedContact);
});

app.delete("/contacto/:id" , async (req, res) => {
    const deleteContact = await prisma.Contacto.delete({
        where: { id: req.params.id},
    });
    res.status(204).send();
});

app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || "Erro interno do servidor" });
});

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
    });
}

module.exports = app;