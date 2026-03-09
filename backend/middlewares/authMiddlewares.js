const jwt = require("jsonwebtoken");

const SECRET = "segredo_super_secreto";

function verificarToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ erro: "Token não fornecido" });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ erro: "Token inválido" });
    }

    req.usuario = decoded;
    next();
  });
}

function verificarAdmin(req, res, next) {
  if (req.usuario.tipo !== "admin") {
    return res.status(403).json({ erro: "Acesso permitido apenas para admin" });
  }
  next();
}

module.exports = { verificarToken, verificarAdmin };