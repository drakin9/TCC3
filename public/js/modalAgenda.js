document.addEventListener("DOMContentLoaded", function () {
  const addProfilePet = document.querySelector(".add-pet");
  const modalAddProfilePet = document.querySelector(".modal-add-pet-profile");
  const main = document.querySelector("main");
  const dateInput = document.querySelector("input[type=date]");
  const modalAddProfilePetClose = document.querySelector(
    ".modal-add-pet-profile .close"
  );

  // Dicionários de espécies
  const especiesGato = {
    0: "Selecione a Raça",
    1: "Persa",
    2: "Maine Coon",
    3: "Siamês",
    4: "Bengal",
    5: "Sphynx",
    6: "Ragdoll",
    7: "Birman",
    8: "Scottish Fold",
    9: "Britânico de Pelo Curto",
    10: "Sem raça definida",
  };
  const especiesCachorro = {
    0: "Selecione a Raça",
    1: "Labrador",
    2: "Poodle",
    3: "Bulldog",
    4: "Beagle",
    5: "Golden Retriever",
    6: "Chihuahua",
    7: "Shih Tzu",
    8: "Pastor Alemão",
    9: "Boxer",
    10: "Dachshund",
    11: "Yorkshire Terrier",
    12: "Cocker Spaniel",
    13: "Maltês",
    14: "Rottweiler",
    15: "Doberman",
    16: "Pinscher",
    17: "Husky Siberiano",
    18: "Sem raça definida",
  };
  const especiesPassaro = {
    0: "Selecione a Raça",
    1: "Papagaio",
    2: "Periquito",
    3: "Calopsita",
    4: "Ninfa",
    5: "Agapornis",
    6: "Canário",
    7: "Cacatua",
    8: "Curió",
    9: "Tico-tico",
    10: "Arara",
  };
  const especiesHamster = {
    0: "Selecione a Raça",
    1: "Porquinho-da-índia",
    2: "Hamster",
    3: "Coelho",
    4: "Gerbil",
    5: "Chinchila",
    6: "Degus",
    7: "Camundongo",
  };

  // Define a data mínima para o input de data
  const dataAtual = new Date();
  let diaAtual = dataAtual.getDate();
  let mesAtual = dataAtual.getMonth() + 1;
  let anoAtual = dataAtual.getFullYear();
  mesAtual = mesAtual < 10 ? `0${mesAtual}` : mesAtual;
  diaAtual = diaAtual < 10 ? `0${diaAtual}` : diaAtual;
  if (dateInput) {
    dateInput.setAttribute("min", `${anoAtual}-${mesAtual}-${diaAtual}`);
  }

  const formAddPet = document.getElementById("formAddPet");
  const especies = document.querySelectorAll(".especie");
  const petRaca = document.getElementById("petRaca");
  const telefone = document.getElementById("telefone");

  const especieImgMap = {
    especieGato: "cat",
    especieCachorro: "dog",
    especiePassaro: "bird",
    especieHamster: "hamster",
  };

  let especieSelected = "";

  // Abre o modal ao clicar no botão "Adicionar Pet"
  addProfilePet.addEventListener("click", () => {
    modalAddProfilePet.style.display = "block";
    main.classList.add("invisible");
  });

  // Fecha o modal ao clicar no "X"
  modalAddProfilePetClose.addEventListener("click", () => {
    modalAddProfilePet.style.display = "none";
    main.classList.remove("invisible");
    especies.forEach((especie) => especie.classList.remove("selected"));
    petRaca.innerHTML = "";
    petRaca.setAttribute("disabled", "true");
  });

  // Seleção de espécie: atualiza o select com as raças correspondentes
  especies.forEach((especie) => {
    especie.addEventListener("click", () => {
      especies.forEach((esp) => esp.classList.remove("selected"));
      especie.classList.add("selected");
      especieSelected = especieImgMap[especie.id];
      petRaca.removeAttribute("disabled");
      petRaca.innerHTML = "";
      let options;
      if (especieSelected === "cat") {
        options = especiesGato;
      } else if (especieSelected === "dog") {
        options = especiesCachorro;
      } else if (especieSelected === "bird") {
        options = especiesPassaro;
      } else if (especieSelected === "hamster") {
        options = especiesHamster;
      }
      for (const chave in options) {
        if (options.hasOwnProperty(chave)) {
          const option = document.createElement("option");
          option.value = options[chave];
          option.textContent = options[chave];
          petRaca.appendChild(option);
        }
      }
    });
  });

  formAddPet.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      tutorNome: document.getElementById("tutorNome").value,
      cpf: document.getElementById("cpf").value,
      telefone: document.getElementById("telefone").value,
      endereco: document.getElementById("endereco").value,
      petNome: document.getElementById("petNome").value,
      petAnoNascimento: document.getElementById("petAnoNascimento").value,
      petRaca: petRaca.value,
      petTipo: especieSelected,
      petAlergias: document.getElementById("alergiasPet").value,
      petVacinas: document.getElementById("petVacinas").value,
      tipoConsulta: document.getElementById("tipoConsulta").value,
      dataConsulta: document.getElementById("dataConsulta").value,
      doutor: document.getElementById("doutor").value,
      especieSelected: especieSelected,
      horario: document.getElementById("horario").value,
    };

    const response = await fetch("/agenda", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Após sucesso, recarrega a página para atualizar a lista de pets
      location.reload();
    } else {
      console.error("Erro ao adicionar pet");
    }
  });
});
