if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("./app");

const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor a correr na porta ${PORT}`);
});

module.exports = app;