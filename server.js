require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/agendamentos", agendamentoRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});