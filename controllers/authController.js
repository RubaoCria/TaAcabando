const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "segredo_super_secreto";

async function register(req, res) {
  try {
    const { nome, email, senha, tipo } = req.body;

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await db.query(
      "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)",
      [nome, email, senhaCriptografada, tipo]
    );

    res.json({ mensagem: "Usuário registrado com sucesso!" });

} catch (error) {
  console.error("ERRO REGISTER:", error);
  res.status(500).json({
    erro: "Erro ao registrar usuário",
    detalhe: error.message
  });
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const usuario = rows[0];

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      tipo: usuario.tipo
    });

} catch (error) {
  console.error("ERRO LOGIN:", error);
  res.status(500).json({
    erro: "Erro no servidor",
    detalhe: error.message
  });
}
}

module.exports = { register, login };