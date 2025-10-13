// js/main.js
import { verificarLogin, exibirMensagem } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("📚 Book.net — Sistema iniciado com sucesso 🚀");

  // ==============================
  // Função global para exibir alertas rápidos
  // ==============================
  window.showAlert = function (mensagem, tipo = "info") {
    const alertBox = document.createElement("div");
    alertBox.className = `alert alert-${tipo} text-center position-fixed top-0 start-50 translate-middle-x mt-3 w-75 shadow`;
    alertBox.textContent = mensagem;

    document.body.prepend(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
  };

  // ==============================
  // Página de login
  // ==============================
  const formLogin = document.querySelector("#formLogin");
  const alertaLogin = document.querySelector("#alertaLogin");

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.querySelector("#email").value.trim();
      const senha = document.querySelector("#senha").value.trim();

      // Usuário padrão — pode ser substituído por uma API futuramente
      const usuarioPadrao = {
        nome: "Administrador",
        email: "admin@book.net",
        senha: "12345",
      };

      if (email === usuarioPadrao.email && senha === usuarioPadrao.senha) {
        localStorage.setItem("bn_user", JSON.stringify(usuarioPadrao));
        exibirMensagem("Login realizado com sucesso!", "success");
        setTimeout(() => (window.location.href = "painel.html"), 1000);
      } else {
        alertaLogin.classList.remove("d-none");
        setTimeout(() => alertaLogin.classList.add("d-none"), 2500);
      }
    });

    return; // evita execução do resto em página de login
  }

  // ==============================
  // Páginas internas — verifica login ativo
  // ==============================
  verificarLogin();

  // Exemplo de mensagem inicial no painel
  if (document.body.dataset.page === "dashboard") {
    showAlert("Bem-vindo ao Painel da Book.net!", "success");
  }
});
