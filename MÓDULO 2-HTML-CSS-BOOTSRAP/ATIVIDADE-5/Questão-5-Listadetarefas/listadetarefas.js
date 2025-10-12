document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#novaTarefa');
  const btn = document.querySelector('#btnAdicionar');
  const lista = document.querySelector('#listaTarefas');
  let contador = 1;

  btn.addEventListener('click', () => {
    const texto = input.value.trim();

    if (texto === '') {
      alert('Digite uma tarefa antes de adicionar.');
      return;
    }

    // Cria item da lista
    const item = document.createElement('li');
    item.className = 'list-group-item d-flex align-items-center';

    // estrutura interna: numero | texto | radios
    item.innerHTML = `
      <div class="numero-tarefa">${contador}.</div>
      <span class="texto-tarefa">${escapeHtml(texto)}</span>
      <div class="checkbox-container" role="radiogroup" aria-label="Status da tarefa">
        <label class="me-2"><input type="radio" name="tarefa-${contador}" value="feito"> Feito</label>
        <label><input type="radio" name="tarefa-${contador}" value="nao-feito"> Não feito</label>
      </div>
    `;

    // Delegação: adiciona listener ao container de radios do item
    const radiosContainer = item.querySelector('.checkbox-container');
    radiosContainer.addEventListener('change', (e) => {
      // encontra o li pai (item)
      const li = e.currentTarget.closest('li');
      if (!li) return;

      // remove ambos os estados e aplica só o selecionado
      li.classList.remove('feito', 'nao-feito');

      // procura qual radio está marcado
      const selecionado = li.querySelector('input[type="radio"]:checked');
      if (!selecionado) return;

      if (selecionado.value === 'feito') {
        li.classList.add('feito');
      } else {
        li.classList.add('nao-feito');
      }
    });

    // adiciona item na lista
    lista.appendChild(item);

    // limpa campo
    input.value = '';
    input.focus();
    contador++;
  });

  // função pequena para evitar XSS ao inserir texto do usuário
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
