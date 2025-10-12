document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#novaTarefa');
  const btn = document.querySelector('#btnAdicionar');
  const lista = document.querySelector('#listaTarefas');
  let contador = 1;

  btn.addEventListener('click', () => {
    const texto = input.value.trim();
    if (texto === '') {
      alert('Digite uma tarefa!');
      return;
    }

    // Cria os elementos
    const li = document.createElement('li');
    li.className = 'list-group-item nao-feito';

    const numero = document.createElement('span');
    numero.className = 'numero-tarefa';
    numero.textContent = `${contador}. `;

    const textoTarefa = document.createElement('span');
    textoTarefa.className = 'texto-tarefa';
    textoTarefa.textContent = texto;

    // Contêiner dos checkboxes
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';

    // Radios "feito" e "não feito"
    const radioFeito = document.createElement('input');
    radioFeito.type = 'radio';
    radioFeito.name = `tarefa${contador}`;
    radioFeito.value = 'feito';

    const labelFeito = document.createElement('label');
    labelFeito.textContent = 'Feito';

    const radioNaoFeito = document.createElement('input');
    radioNaoFeito.type = 'radio';
    radioNaoFeito.name = `tarefa${contador}`;
    radioNaoFeito.value = 'nao-feito';
    radioNaoFeito.checked = true;

    const labelNaoFeito = document.createElement('label');
    labelNaoFeito.textContent = 'Não feito';

    // Ações dos radios
    radioFeito.addEventListener('change', () => {
      li.classList.remove('nao-feito');
      li.classList.add('feito');
      radioFeito.disabled = true;
      radioNaoFeito.disabled = true;
    });

    radioNaoFeito.addEventListener('change', () => {
      li.classList.remove('feito');
      li.classList.add('nao-feito');
    });

    // Montagem dos elementos
    checkboxContainer.append(radioFeito, labelFeito, radioNaoFeito, labelNaoFeito);
    li.append(numero, textoTarefa);
    li.appendChild(checkboxContainer);
    lista.appendChild(li);

    contador++;
    input.value = '';
    input.focus();
    // Botão Gerar Resultado
const btnResultado = document.querySelector('#btnResultado');
const resultadoDiv = document.querySelector('#resultadoTarefas');

btnResultado.addEventListener('click', () => {
  const tarefas = document.querySelectorAll('#listaTarefas .list-group-item');
  let feitas = 0;
  let pendentes = 0;

  tarefas.forEach(tarefa => {
    if (tarefa.classList.contains('feito')) {
      feitas++;
    } else {
      pendentes++;
    }
  });

  const total = feitas + pendentes;
  const percentual = total > 0 ? Math.round((feitas / total) * 100) : 0;

  let mensagem = '';
  if (percentual === 100) {
    mensagem = 'Excelente! Todas as tarefas concluídas! 🎯';
  } else if (percentual >= 70) {
    mensagem = 'Ótimo desempenho! Continue assim 💪';
  } else if (percentual >= 40) {
    mensagem = 'Bom progresso! Ainda há tarefas pendentes.';
  } else {
    mensagem = 'Vamos melhorar! Você consegue!';
  }

  resultadoDiv.innerHTML = `
    <p>✔️ Tarefas concluídas: ${feitas}</p>
    <p>❌ Tarefas pendentes: ${pendentes}</p>
    <p>⭐ Desempenho: ${percentual}% - ${mensagem}</p>
  `;
});

  });
});
