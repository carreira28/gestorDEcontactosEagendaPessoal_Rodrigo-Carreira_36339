const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const path = require("path");

const contactoRoutes = require("./routes/contactoRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/photos", express.static(path.join(__dirname, "../photos")));

app.use("/contacto", contactoRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
