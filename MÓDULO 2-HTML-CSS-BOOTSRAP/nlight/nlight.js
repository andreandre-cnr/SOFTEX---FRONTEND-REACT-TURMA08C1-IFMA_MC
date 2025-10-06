// Espera o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {

    // ====== 1. EFEITO DE ROLAGEM SUAVE NOS LINKS ======
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 60,
            behavior: "smooth"
          });
        }
      });
    });
  
    // ====== 2. ANIMAÇÃO DE ENTRADA DOS CARDS ======
    const cards = document.querySelectorAll(".card");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });
  
    cards.forEach(card => {
      observer.observe(card);
    });
  
    // ====== 3. VALIDAÇÃO BÁSICA DO FORMULÁRIO ======
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const nome = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const telefone = form.querySelector('input[type="tel"]').value.trim();
  
      if (!nome || !email || !telefone) {
        alert("Por favor, preencha todos os campos antes de enviar.");
        return;
      }
  
      // Simula envio (poderia ser substituído por requisição real)
      alert("Cadastro enviado com sucesso! Obrigado por se tornar parceiro(a).");
  
      form.reset();
    });
  
  });
  