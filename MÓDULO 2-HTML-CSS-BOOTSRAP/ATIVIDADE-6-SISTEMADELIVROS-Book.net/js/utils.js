// utils.js
// Funções auxiliares do sistema Book.net

// Recupera o usuário logado
export function getUsuarioLogado() {
  const user = localStorage.getItem('bn_user');
  return user ? JSON.parse(user) : null;
}

// Garante que há um usuário logado antes de acessar páginas internas
export function verificarLogin() {
  const user = getUsuarioLogado();
  if (!user) {
    alert('Acesso negado! Faça login para continuar.');
    window.location.href = 'login.html';
  }
  return user;
}

// Formata valores em moeda local
export function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Exibe uma notificação rápida
export function exibirMensagem(msg, tipo = 'info') {
  const div = document.createElement('div');
  div.textContent = msg;
  div.className = `alert alert-${tipo} position-fixed bottom-0 end-0 m-3`;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}
