// /catalogo/livros.js
// Catálogo público — consulta de livros via Open Library

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#formBusca");
  const lista = document.querySelector("#listaLivros");
  const info = document.querySelector("#infoResultados");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const termo = document.querySelector("#busca").value.trim();
    if (!termo) return;

    info.textContent = "Buscando livros...";
    lista.innerHTML = "";

    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(termo)}&limit=10`);
      const data = await res.json();

      if (!data.docs || data.docs.length === 0) {
        info.textContent = "Nenhum resultado encontrado.";
        return;
      }

      info.textContent = `Encontrados ${data.docs.length} livros:`;
      data.docs.forEach((livro) => {
        const cover = livro.cover_i
          ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
          : "../img/logo-booknet.png";

        const item = document.createElement("div");
        item.className = "col-md-4 mb-4";
        item.innerHTML = `
          <div class="card h-100">
            <img src="${cover}" class="card-img-top" alt="${livro.title}">
            <div class="card-body">
              <h5 class="card-title">${livro.title}</h5>
              <p class="card-text"><strong>Autor:</strong> ${livro.author_name?.[0] || "Desconhecido"}</p>
              <p class="card-text"><strong>Editora:</strong> ${livro.publisher?.[0] || "—"}</p>
              <p class="card-text"><strong>Ano:</strong> ${livro.first_publish_year || "—"}</p>
            </div>
          </div>
        `;
        lista.appendChild(item);
      });
    } catch (error) {
      console.error(error);
      info.textContent = "Erro ao buscar livros.";
    }
  });
});
