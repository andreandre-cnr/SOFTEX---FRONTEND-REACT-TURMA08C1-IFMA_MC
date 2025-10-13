// js/livros.js
// Busca na Open Library + filtros + verificação de login para ações

document.addEventListener('DOMContentLoaded', () => {
  const qInput = document.getElementById('q');
  const btnBuscar = document.getElementById('btnBuscar');
  const btnClear = document.getElementById('btnClear');
  const fAno = document.getElementById('fAno');
  const fPublisher = document.getElementById('fPublisher');
  const lista = document.getElementById('lista');
  const infoResultados = document.getElementById('infoResultados');
  const paginacao = document.getElementById('paginacao');

  let resultados = [];
  let pageSize = 12;
  let currentPage = 1;
  let totalDocs = 0;

  // Função utilitária para verificar se o usuário está logado
  function getUserSession() {
    return JSON.parse(localStorage.getItem('bn_user') || 'null');
  }

  function debounce(fn, delay=400) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  }

  async function fetchOpenLibrary(query, page=1) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Erro ao buscar na Open Library');
    const data = await res.json();
    return data;
  }

  function coverUrl(cover_i) {
    if (!cover_i) return '../img/logo-booknet.png';
    return `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
  }

  function renderCard(doc) {
    const title = doc.title || '—';
    const authors = Array.isArray(doc.author_name) ? doc.author_name.join(', ') : (doc.author_name || '—');
    const publisher = Array.isArray(doc.publisher) ? doc.publisher[0] : (doc.publisher || '—');
    const year = doc.first_publish_year || '—';
    const cover = coverUrl(doc.cover_i);

    const col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4 col-lg-3';

    col.innerHTML = `
      <div class="card h-100">
        <img src="${cover}" class="card-img-top" alt="${escapeHtml(title)}" style="height:220px; object-fit:cover;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title" style="font-size:1rem">${escapeHtml(title)}</h5>
          <p class="card-text mb-1"><small><strong>Autor:</strong> ${escapeHtml(authors)}</small></p>
          <p class="card-text mb-1"><small><strong>Editora:</strong> ${escapeHtml(publisher)}</small></p>
          <p class="card-text mb-2"><small><strong>Ano:</strong> ${year}</small></p>
          <div class="mt-auto d-grid">
            <button class="btn btn-sm btn-outline-primary btn-alugar" data-title="${escapeHtml(title)}">Alugar</button>
            <button class="btn btn-sm btn-outline-success mt-1 btn-comprar" data-title="${escapeHtml(title)}">Comprar</button>
          </div>
        </div>
      </div>
    `;
    return col;
  }

  function renderPage(arr, page = 1) {
    lista.innerHTML = '';
    currentPage = page;
    const start = (page - 1) * pageSize;
    const pageItems = arr.slice(start, start + pageSize);
    pageItems.forEach(doc => lista.appendChild(renderCard(doc)));
    renderPagination(Math.ceil(arr.length / pageSize));
    infoResultados.textContent = `Mostrando ${start+1}-${Math.min(start+pageSize, arr.length)} de ${arr.length} resultados (total API: ${totalDocs})`;
  }

  function renderPagination(totalPages) {
    paginacao.innerHTML = '';
    if (totalPages <= 1) return;

    const prev = document.createElement('li');
    prev.className = 'page-item ' + (currentPage === 1 ? 'disabled' : '');
    prev.innerHTML = `<a class="page-link" href="#">Anterior</a>`;
    prev.addEventListener('click', e => { e.preventDefault(); if (currentPage>1) renderPage(resultados, currentPage-1); });
    paginacao.appendChild(prev);

    const maxButtons = 7;
    let start = Math.max(1, currentPage - 3);
    let end = Math.min(totalPages, start + maxButtons -1);
    if (end - start < maxButtons -1) start = Math.max(1, end - maxButtons +1);

    for (let i = start; i <= end; i++) {
      const li = document.createElement('li');
      li.className = 'page-item ' + (i === currentPage ? 'active' : '');
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.addEventListener('click', e => { e.preventDefault(); renderPage(resultados, i); });
      paginacao.appendChild(li);
    }

    const next = document.createElement('li');
    next.className = 'page-item ' + (currentPage === totalPages ? 'disabled' : '');
    next.innerHTML = `<a class="page-link" href="#">Próxima</a>`;
    next.addEventListener('click', e => { e.preventDefault(); if (currentPage<totalPages) renderPage(resultados, currentPage+1); });
    paginacao.appendChild(next);
  }

  function applyLocalFilters(docs) {
    const text = qInput.value.trim().toLowerCase();
    const year = fAno.value.trim();
    const publisher = fPublisher.value.trim().toLowerCase();

    return docs.filter(doc => {
      const t = (doc.title || '').toLowerCase();
      const author = (Array.isArray(doc.author_name) ? doc.author_name.join(' ').toLowerCase() : (doc.author_name || '').toLowerCase());
      const pub = (Array.isArray(doc.publisher) ? doc.publisher.join(' ').toLowerCase() : (doc.publisher || '').toLowerCase());
      const y = (doc.first_publish_year || '').toString();

      const matchesText = !text || t.includes(text) || author.includes(text) || pub.includes(text);
      const matchesYear = !year || y === year;
      const matchesPublisher = !publisher || pub.includes(publisher);

      return matchesText && matchesYear && matchesPublisher;
    });
  }

  async function buscar(page=1) {
    const query = qInput.value.trim() || 'programming';
    try {
      btnBuscar.disabled = true;
      infoResultados.textContent = 'Buscando...';

      const data = await fetchOpenLibrary(query, page);
      totalDocs = data.numFound || 0;
      resultados = data.docs || [];
      const filtrados = applyLocalFilters(resultados);
      renderPage(filtrados, 1);
    } catch (err) {
      console.error(err);
      infoResultados.textContent = 'Erro na busca.';
    } finally {
      btnBuscar.disabled = false;
    }
  }

  btnBuscar.addEventListener('click', e => { e.preventDefault(); buscar(1); });
  btnClear.addEventListener('click', e => {
    qInput.value = ''; fAno.value = ''; fPublisher.value = '';
    lista.innerHTML = ''; infoResultados.textContent = '';
    resultados = []; totalDocs = 0; paginacao.innerHTML = '';
  });

  qInput.addEventListener('input', debounce(() => buscar(1), 600));
  fAno.addEventListener('input', debounce(() => {
    if (resultados.length) renderPage(applyLocalFilters(resultados), 1);
  }, 400));
  fPublisher.addEventListener('input', debounce(() => {
    if (resultados.length) renderPage(applyLocalFilters(resultados), 1);
  }, 400));

  // Delegação dos botões com verificação de login
  lista.addEventListener('click', (e) => {
    if (e.target.matches('.btn-alugar') || e.target.matches('.btn-comprar')) {
      const title = e.target.dataset.title;
      const user = getUserSession();

      if (!user) {
        alert('⚠️ Você precisa estar logado para realizar esta ação.\nRedirecionando para o login...');
        window.location.href = '../pages/login.html';
        return;
      }

      if (e.target.matches('.btn-alugar')) {
        alert(`📚 ${user.nome}, o pedido de aluguel do livro "${title}" foi registrado!`);
      }

      if (e.target.matches('.btn-comprar')) {
        alert(`🛒 ${user.nome}, o pedido de compra do livro "${title}" foi registrado!`);
      }
    }
  });

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }
});
