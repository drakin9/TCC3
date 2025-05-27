const mongoose = require("mongoose");

const AgendamentoSchema = new mongoose.Schema({
  petNome: String,
  raca: String,
  tutorNome: String,
  horario: String,
  tipoConsulta: String,
  petTipo: String,
  dataConsulta: { type: Date, required: true },
  status: { type: String, default: "Confirmado" },
  sala: { type: String, default: "Consultório 2" },
});

module.exports = mongoose.model("Agendamento", AgendamentoSchema);
