require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Rota principal (para testar se API está online)
app.get("/", (req, res) => {
  res.send("API Barbearia TCC Online 🚀");
});

// Rotas do sistema
app.use("/auth", authRoutes);
app.use("/agendamentos", agendamentoRoutes);
app.use("/dashboard", dashboardRoutes);

// ⚠️ IMPORTANTE para funcionar no Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});