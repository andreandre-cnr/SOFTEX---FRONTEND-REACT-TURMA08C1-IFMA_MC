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
    item.className = 'list-group-item';
    item.innerHTML = `
      <strong>${contador}.</strong>
      <span>${texto}</span>
      <div class="checkbox-container">
        <label><input type="radio" name="tarefa-${contador}" value="feito"> Feito</label>
        <label><input type="radio" name="tarefa-${contador}" value="nao-feito"> Não feito</label>
      </div>
    `;

    // Evento dos checkboxes
    const radios = item.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        item.classList.remove('feito', 'nao-feito');
        if (e.target.value === 'feito') {
          item.classList.add('feito');
        } else {
          item.classList.add('nao-feito');
        }
      });
    });

    lista.appendChild(item);
    input.value = '';
    input.focus();
    contador++;
  });
});
