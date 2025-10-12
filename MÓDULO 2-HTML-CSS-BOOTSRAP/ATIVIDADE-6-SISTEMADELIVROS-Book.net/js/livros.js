// js/livros.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Página de livros carregada.");

  const form = document.querySelector("#formLivro");
  const tabela = document.querySelector("#tabelaLivros tbody");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isbn = form.querySelector("#isbn").value.trim();
    const titulo = form.querySelector("#titulo").value.trim();
    const autor = form.querySelector("#autor").value.trim();

    if (!isbn || !titulo || !autor) {
      showAlert("Preencha todos os campos obrigatórios!", "warning");
      return;
    }

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${isbn}</td>
      <td>${titulo}</td>
      <td>${autor}</td>
    `;
    tabela.appendChild(linha);

    form.reset();
    showAlert("Livro cadastrado com sucesso!", "success");
  });
});
