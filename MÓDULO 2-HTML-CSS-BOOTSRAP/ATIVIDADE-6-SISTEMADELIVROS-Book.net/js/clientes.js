// js/clientes.js
import { verificarLogin } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("Página de clientes carregada.");

  const form = document.querySelector("#formCliente");
  const tabela = document.querySelector("#tabelaClientes tbody");

  if (!form) return; // Evita erro se não estiver na página correta

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = form.querySelector("#nome").value.trim();
    const cpf = form.querySelector("#cpf").value.trim();
    const telefone = form.querySelector("#telefone").value.trim();

    // clientes.js
function cadastrarCliente(cliente) {
  const lista = JSON.parse(localStorage.getItem("clientes")) || [];
  lista.push(cliente);
  localStorage.setItem("clientes", JSON.stringify(lista));
}

    if (!nome || !cpf || !telefone) {
      showAlert("Preencha todos os campos obrigatórios!", "warning");
      return;
    }

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${nome}</td>
      <td>${cpf}</td>
      <td>${telefone}</td>
    `;
    tabela.appendChild(linha);

    form.reset();
    showAlert("Cliente cadastrado com sucesso!", "success");
  });
});
