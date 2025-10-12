// js/reservas.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Página de reservas carregada.");

  const form = document.querySelector("#formReserva");
  const tabela = document.querySelector("#tabelaReservas tbody");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cliente = form.querySelector("#clienteReserva").value.trim();
    const livro = form.querySelector("#livroReserva").value.trim();

    if (!cliente || !livro) {
      showAlert("Preencha todos os campos!", "warning");
      return;
    }

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${cliente}</td>
      <td>${livro}</td>
      <td>Aguardando disponibilidade</td>
    `;
    tabela.appendChild(linha);

    form.reset();
    showAlert("Reserva adicionada à fila!", "success");
  });
});
