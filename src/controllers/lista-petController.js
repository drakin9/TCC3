const Pet = require("../models/agendamento"); // Vai pegar os modelos do agendamento do pet, preciso mudar o nome disso dps

exports.index = async (req, res) => {
  try {
    const pets = await Pet.find(); //vai procurar no mongo
    res.render("lista-pets", { pets }); //renderiza o ejs
  } catch (err) {
    res.status(500).send("Erro ao buscar os pets"); // se der erro, oque eu espero que não aconteça
  }
};
