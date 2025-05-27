const Agendamento = require("../models/agendamento"); // Importa o modelo de Agendamento

// Rota para a página de agenda (GET)
exports.agenda = async (req, res) => {
  try {
    const agendamentos = await Agendamento.find().sort({
      dataConsulta: 1,
      horario: 1,
    }); // Busca agendamentos no banco de dados
    res.render("agenda", { agendamentos }); // Passa os agendamentos para o EJS
  } catch (err) {
    res.status(500).send("Erro ao buscar agendamentos");
  }
};

// Rota para cadastrar novo agendamento (POST)
exports.criar = async (req, res) => {
  try {
    const novoAgendamento = new Agendamento({
      petNome: req.body.petNome,
      raca: req.body.petRaca,
      tutorNome: req.body.tutorNome,
      horario: req.body.horario,
      dataConsulta: req.body.dataConsulta,
      tipoConsulta: req.body.tipoConsulta,
      petTipo: req.body.petTipo,
    });

    await novoAgendamento.save(); // Salva o novo agendamento no MongoDB
    res.redirect("/agenda"); // Redireciona para a agenda após salvar
  } catch (err) {
    res.status(500).send("Erro ao salvar agendamento");
  }
};
