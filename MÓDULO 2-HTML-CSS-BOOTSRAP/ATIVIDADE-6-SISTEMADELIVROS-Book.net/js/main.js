// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Book.net — Sistema iniciado com sucesso 🚀");

  // Função global para exibir alertas personalizados
  window.showAlert = function (mensagem, tipo = "info") {
    const alertBox = document.createElement("div");
    alertBox.className = `alert alert-${tipo} text-center`;
    alertBox.textContent = mensagem;

    document.body.prepend(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
  };

  // Exemplo: alerta de boas-vindas
  if (document.body.dataset.page === "dashboard") {
    showAlert("Bem-vindo ao Painel da Book.net!", "success");
  }
});
