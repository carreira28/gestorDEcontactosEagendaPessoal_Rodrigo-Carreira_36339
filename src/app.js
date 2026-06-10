const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const path = require("path");

const AuthRoutes = require("./routes/AuthRoutes");
const contactoRoutes = require("./routes/contactoRoutes");
const LembretesRoutes = require("./routes/LembretesRoutes");
const GroupRoutes = require("./routes/GroupRoutes");

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("allowedOrigins:", allowedOrigins);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("dev"));

app.use("/photos", express.static(path.join(__dirname, "../photos")));

app.use("/auth", AuthRoutes);
app.use("/contacto", contactoRoutes);
app.use("/lembrete", LembretesRoutes);
app.use("/group", GroupRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;