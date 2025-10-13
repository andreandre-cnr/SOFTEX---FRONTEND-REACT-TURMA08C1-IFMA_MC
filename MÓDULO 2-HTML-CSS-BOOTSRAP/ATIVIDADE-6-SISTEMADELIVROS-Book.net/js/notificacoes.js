// notificacoes.js
import { verificarLogin, exibirMensagem } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const user = verificarLogin();
  const lista = document.querySelector('#listaNotificacoes');

  // Exemplo de notificações mockadas (poderia vir de API futuramente)
  const notificacoes = [
    { tipo: 'promo', texto: 'Novo título disponível: "Desenvolvimento Web com React"' },
    { tipo: 'alerta', texto: 'Seu aluguel do livro "Banco de Dados Avançado" vence amanhã.' },
    { tipo: 'info', texto: 'Novos exemplares chegaram à Book.net!' },
  ];

  notificacoes.forEach(n => {
    const item = document.createElement('li');
    item.textContent = n.texto;
    item.classList.add('list-group-item');
    if (n.tipo === 'promo') item.classList.add('list-group-item-success');
    if (n.tipo === 'alerta') item.classList.add('list-group-item-warning');
    if (n.tipo === 'info') item.classList.add('list-group-item-light');
    lista.appendChild(item);
  });

  exibirMensagem(`Bem-vindo(a), ${user.nome}!`, 'success');
});
