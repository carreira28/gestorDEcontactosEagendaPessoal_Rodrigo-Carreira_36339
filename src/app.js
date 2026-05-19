const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const path = require("path");

const contactoRoutes = require("./routes/contactoRoutes");
const LembretesRoutes = require("./routes/LembretesRoutes")
const GroupRoutes = require("./routes/GroupRoutes")

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/photos", express.static(path.join(__dirname, "../photos")));

app.use("/contacto", contactoRoutes);
app.use("/lembrete", LembretesRoutes);
app.use("/group", GroupRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
