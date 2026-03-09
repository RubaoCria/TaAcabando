require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db"); // ✅ caminho correto do banco

const authRoutes = require("./routes/authRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// rota principal
app.get("/", (req, res) => {
  res.send("API Barbearia TCC Online 🚀");
});

// rotas do sistema
app.use("/auth", authRoutes);
app.use("/agendamentos", agendamentoRoutes);
app.use("/dashboard", dashboardRoutes);

// porta do Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});

// 🔥 testar conexão com banco
async function testarBanco() {
  try {
    await db.query("SELECT 1");
    console.log("✅ Banco conectado com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao conectar no banco:", err);
  }
}

testarBanco();