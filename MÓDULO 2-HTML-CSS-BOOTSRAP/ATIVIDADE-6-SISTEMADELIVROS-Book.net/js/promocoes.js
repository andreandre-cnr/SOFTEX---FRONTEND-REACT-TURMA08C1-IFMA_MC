// promocoes.js
import { verificarLogin, formatarMoeda } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const user = verificarLogin();
  const container = document.querySelector('#listaPromocoes');

  const promocoes = [
    {
      titulo: 'Clean Code',
      autor: 'Robert C. Martin',
      precoAntigo: 120.00,
      precoAtual: 89.90,
      imagem: 'img/livros/clean-code.jpg'
    },
    {
      titulo: 'Estruturas de Dados em JS',
      autor: 'Loiane Groner',
      precoAntigo: 99.00,
      precoAtual: 69.90,
      imagem: 'img/livros/estruturas-js.jpg'
    },
    {
      titulo: 'Redes de Computadores',
      autor: 'Andrew Tanenbaum',
      precoAntigo: 180.00,
      precoAtual: 135.00,
      imagem: 'img/livros/redes.jpg'
    }
  ];

  promocoes.forEach(livro => {
    const card = document.createElement('div');
    card.className = 'card mb-3 shadow-sm';
    card.style.width = '18rem';

    card.innerHTML = `
      <img src="${livro.imagem}" class="card-img-top" alt="${livro.titulo}">
      <div class="card-body">
        <h5 class="card-title">${livro.titulo}</h5>
        <p class="card-text"><small>${livro.autor}</small></p>
        <p class="card-text text-muted"><s>${formatarMoeda(livro.precoAntigo)}</s></p>
        <p class="card-text text-success fw-bold">${formatarMoeda(livro.precoAtual)}</p>
        <button class="btn btn-primary btn-sm">Comprar</button>
      </div>
    `;
    container.appendChild(card);
  });
});
