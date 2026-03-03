const express = require("express");
const router = express.Router();

const { dashboard } = require("../controllers/dashboardController");
const { verificarToken, verificarAdmin } = require("../middlewares/authMiddlewares");

router.get("/", verificarToken, verificarAdmin, dashboard);

module.exports = router;