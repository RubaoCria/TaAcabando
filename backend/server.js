require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db"); // 👈 IMPORTAR O BANCO

const authRoutes = require("./routes/authRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// rota teste
app.get("/", (req, res) => {
  res.send("API Barbearia TCC Online 🚀");
});

// rotas
app.use("/auth", authRoutes);
app.use("/agendamentos", agendamentoRoutes);
app.use("/dashboard", dashboardRoutes);

// porta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});

// testar conexão com banco
db.getConnection()
  .then(() => console.log("✅ Banco conectado"))
  .catch(err => console.log("❌ Erro banco:", err));