const db = require("../config/db");

async function listarBarbeiros(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM barbeiros");
    res.json(rows);
  } catch {
    res.status(500).json({ erro: "Erro ao buscar barbeiros" });
  }
}

async function agendar(req, res) {
  try {
    const usuario_id = req.usuario.id;
    const { barbeiro_id, data, horario } = req.body;

    const [existente] = await db.query(
      `SELECT * FROM agendamentos 
       WHERE barbeiro_id = ? 
       AND data = ? 
       AND horario = ? 
       AND status = 'ativo'`,
      [barbeiro_id, data, horario]
    );

    if (existente.length > 0) {
      return res.status(400).json({ erro: "Horário já ocupado" });
    }

    await db.query(
      `INSERT INTO agendamentos (usuario_id, barbeiro_id, data, horario, status) 
       VALUES (?, ?, ?, ?, 'ativo')`,
      [usuario_id, barbeiro_id, data, horario]
    );

    res.json({ mensagem: "Agendamento realizado!" });

  } catch {
    res.status(500).json({ erro: "Erro ao agendar" });
  }
}

async function meusAgendamentos(req, res) {
  try {
    const usuario_id = req.usuario.id;

    const [rows] = await db.query(
      `SELECT a.id,
              b.nome AS barbeiro,
              a.data,
              a.horario,
              a.status
       FROM agendamentos a
       JOIN barbeiros b ON a.barbeiro_id = b.id
       WHERE a.usuario_id = ?`,
      [usuario_id]
    );

    res.json(rows);

  } catch {
    res.status(500).json({ erro: "Erro ao buscar agendamentos" });
  }
}

async function cancelarAgendamento(req, res) {
  try {
    const agendamento_id = req.params.id;
    const usuario_id = req.usuario.id;
    const tipo = req.usuario.tipo;

    const [rows] = await db.query(
      "SELECT * FROM agendamentos WHERE id = ?",
      [agendamento_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Agendamento não encontrado" });
    }

    const agendamento = rows[0];

    if (tipo !== "admin" && agendamento.usuario_id !== usuario_id) {
      return res.status(403).json({ erro: "Você só pode cancelar seu próprio agendamento" });
    }

    await db.query(
      "UPDATE agendamentos SET status = 'cancelado' WHERE id = ?",
      [agendamento_id]
    );

    res.json({ mensagem: "Agendamento cancelado com sucesso!" });

  } catch {
    res.status(500).json({ erro: "Erro ao cancelar" });
  }
}

module.exports = {
  listarBarbeiros,
  agendar,
  meusAgendamentos,
  cancelarAgendamento
};