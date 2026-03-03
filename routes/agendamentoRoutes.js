const express = require("express");
const router = express.Router();

const {
  listarBarbeiros,
  agendar,
  meusAgendamentos,
  cancelarAgendamento
} = require("../controllers/agendamentoController");

const { verificarToken } = require("../middlewares/authMiddlewares");

router.get("/barbeiros", listarBarbeiros);
router.post("/agendar", verificarToken, agendar);
router.get("/meus", verificarToken, meusAgendamentos);
router.put("/cancelar/:id", verificarToken, cancelarAgendamento);

module.exports = router;