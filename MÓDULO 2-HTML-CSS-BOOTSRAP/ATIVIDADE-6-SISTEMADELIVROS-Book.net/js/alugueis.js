// js/alugueis.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Página de aluguéis carregada.");

  const form = document.querySelector("#formAluguel");
  const tabela = document.querySelector("#tabelaAlugueis tbody");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cliente = form.querySelector("#cliente").value.trim();
    const livro = form.querySelector("#livro").value.trim();
    const dias = parseInt(form.querySelector("#dias").value);

    if (!cliente || !livro || !dias) {
      showAlert("Preencha todos os campos!", "warning");
      return;
    }

    if (dias > 14) {
      showAlert("O prazo máximo de aluguel é de 14 dias!", "danger");
      return;
    }

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${cliente}</td>
      <td>${livro}</td>
      <td>${dias} dias</td>
    `;
    tabela.appendChild(linha);

    form.reset();
    showAlert("Aluguel registrado com sucesso!", "success");
  });
});
