// js/auth.js
import { verificarLogin } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // elementos
  const tabLinks = document.querySelectorAll('#tabAuth a');
  const formLogin = document.getElementById('formLogin');
  const formRegister = document.getElementById('formRegister');
  const authMsg = document.getElementById('authMsg');

  // alterna abas
  tabLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      tabLinks.forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      const tab = a.dataset.tab;
      if (tab === 'login') {
        formLogin.style.display = '';
        formRegister.style.display = 'none';
      } else {
        formLogin.style.display = 'none';
        formRegister.style.display = '';
      }
      authMsg.innerHTML = '';
    });
  });

  // util: obter users do localStorage
  function getUsers() {
    return JSON.parse(localStorage.getItem('bn_users') || '[]');
  }
  function saveUsers(arr) {
    localStorage.setItem('bn_users', JSON.stringify(arr));
  }

  // register
  if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('regNome').value.trim();
      const email = document.getElementById('regEmail').value.trim().toLowerCase();
      const senha = document.getElementById('regSenha').value;

      if (!nome || !email || !senha) {
        authMsg.innerHTML = `<div class="alert alert-warning">Preencha todos os campos.</div>`;
        return;
      }

      const users = getUsers();
      if (users.some(u => u.email === email)) {
        authMsg.innerHTML = `<div class="alert alert-danger">E-mail já cadastrado.</div>`;
        return;
      }

      users.push({ nome, email, senha });
      saveUsers(users);
      authMsg.innerHTML = `<div class="alert alert-success">Conta criada com sucesso. Você já pode logar.</div>`;
      formRegister.reset();
    });
  }

  // login
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const senha = document.getElementById('loginSenha').value;

      const users = getUsers();
      const user = users.find(u => u.email === email && u.senha === senha);
      if (!user) {
        authMsg.innerHTML = `<div class="alert alert-danger">Credenciais inválidas.</div>`;
        return;
      }

      // set session (simples)
      localStorage.setItem('bn_user', JSON.stringify({ nome: user.nome, email: user.email }));
      authMsg.innerHTML = `<div class="alert alert-success">Olá, ${user.nome}! Redirecionando...</div>`;

      setTimeout(() => {
        window.location.href = '../index.html'; // volta ao painel
      }, 900);
    });
  }
});
