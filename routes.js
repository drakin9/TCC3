const express = require("express");
const router = express.Router();
const petController = require("./src/controllers/petController");
const agendaController = require("./src/controllers/agendaController");
const listapetController = require("./src/controllers/lista-petController");
const estoqueController = require("./src/controllers/estoqueController");
const financeiroController = require("./src/controllers/financeiroController");
const relatorioController = require("./src/controllers/relatorioController");

router.get("/", petController.index);
router.post("/", petController.entrar);

router.get("/agenda", agendaController.agenda);
router.post("/agenda", agendaController.criar);

router.get("/lista-pets", listapetController.index);

router.get("/estoque", estoqueController.index);
router.post("/estoque", estoqueController.adicionar);
router.Post("/estoque", estoqueController.editar);
router.delete("/estoque/:id", estoqueController.deletar);

router.get("/financeiro", financeiroController.financeiro);

router.get("/relatorios", relatorioController.relatorio);

module.exports = router;
