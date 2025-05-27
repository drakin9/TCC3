console.log("🎉 modalEstoque.js carregado!");
document.addEventListener("DOMContentLoaded", () => {
  // Modal adicionar item
  console.log("🎉 modalEstoque.js carregado22!");
  const buttonAddItem = document.querySelector(".add-item");
  const modalAddItem = document.querySelector(".modal-add-item");
  const closeModal = document.querySelector(".close");
  const addStockItem = document.getElementById("addStockItem");
  const buttonsEdit = document.querySelectorAll(".item button");

  closeModal.addEventListener("click", () => {
    modalAddItem.style.display = "none";
  });

  buttonAddItem.addEventListener("click", () => {
    modalAddItem.style.display = "block";
  });

  addStockItem.addEventListener("submit", async function (e) {
    e.preventDefault();
    const dadosEstoque = {
      newItemCategory: document.getElementById("newItemCategory").value,
      newItemName: document.getElementById("newItemName").value,
      newItemPrice: document.getElementById("newItemPrice").value,
      newItemQuantity: document.getElementById("newItemQuantity").value,
    };
    const response = await fetch("/estoque", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosEstoque),
    });
    if (response.ok) {
      window.location.reload(); // Recarrega a página para exibir os dados atualizados
    } else {
      console.error("Erro ao adicionar pet");
    }
  });
  // Modal editar item
  const modalEdit = document.querySelector(".modal-edit-item.stock");
  const closeEdit = modalEdit.querySelector(".close-edit");
  const editForm = document.getElementById("editStockItem");

  // Abre modal de edição preenchendo dados
  document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const itemDiv = button.closest(".item");
      const nome = itemDiv.querySelector(".nome p").textContent.trim();
      const categoria = itemDiv
        .querySelector(".categoria p")
        .textContent.trim();
      const precoTxt = itemDiv.querySelector(".preco p").textContent;
      const preco = Number(
        precoTxt.replace(/[^0-9,\.]/g, "").replace(",", ".")
      );
      const qtd = Number(itemDiv.querySelector(".quantidade p").textContent);

      // Preenche formulário
      editForm.editItemName.value = nome;
      editForm.editItemCategory.value = categoria;
      editForm.editItemPrice.value = preco;
      editForm.editItemQuantity.value = qtd;
      // Guarda endpoint no form
      editForm.dataset.endpoint = `/estoque`;

      modalEdit.classList.add("open");
    });
  });

  // Fecha modal de edição
  closeEdit.addEventListener("click", () => {
    modalEdit.classList.remove("open");
  });

  // Submit via fetch para /estoque/:id/edit
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const endpoint = editForm.dataset.endpoint;
    console.log("Enviando edição para:", endpoint);

    const body = {
      newItemCategory: editForm.newItemCategory.value,
      newItemName: editForm.newItemName.value,
      newItemPrice: Number(editForm.newItemPrice.value),
      newItemQuantity: Number(editForm.newItemQuantity.value),
    };
    console.log("Payload EDIT:", body);

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log("Status EDIT:", res.status);
    if (res.ok) window.location.reload();
    else console.error("Erro ao editar item");
  });
});
