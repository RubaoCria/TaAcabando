const db = require("../config/db");

async function dashboard(req, res) {
  try {
    const [[clientes]] = await db.query(
      "SELECT COUNT(*) AS total FROM usuarios WHERE tipo = 'cliente'"
    );

    const [[barbeiros]] = await db.query(
      "SELECT COUNT(*) AS total FROM barbeiros"
    );

    const [[agendamentos]] = await db.query(
      "SELECT COUNT(*) AS total FROM agendamentos"
    );

    res.json({
      totalClientes: clientes.total,
      totalBarbeiros: barbeiros.total,
      totalAgendamentos: agendamentos.total
    });

  } catch {
    res.status(500).json({ erro: "Erro no dashboard" });
  }
}

module.exports = { dashboard };