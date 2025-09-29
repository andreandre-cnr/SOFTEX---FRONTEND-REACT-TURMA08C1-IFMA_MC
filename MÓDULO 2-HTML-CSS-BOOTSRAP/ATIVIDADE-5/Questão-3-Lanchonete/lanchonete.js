document.addEventListener('DOMContentLoaded', () => {
  const btnCalcular = document.querySelector('#btnCalcular');
  const nomeClienteSpan = document.querySelector('#nomeCliente');
  const tbody = document.querySelector('#tabelaResultado tbody');
  const totalPedido = document.querySelector('#totalPedido');

  const precos = {
    'Suco': 4.0,
    'Refrigerante': 2.5,
    'Água': 1.5,
    'Bolo': 3.5,
    'Pastel': 3.0,
    'Torta': 4.0
  };

  btnCalcular.addEventListener('click', () => {
    const nome = document.querySelector('#nome').value.trim();
    const bebidaSelecionada = document.querySelector('input[name="bebida"]:checked');
    const comidasSelecionadas = document.querySelectorAll('input[name="comida"]:checked');

    if (!nome || !bebidaSelecionada) {
      alert("Preencha seu nome e selecione uma bebida.");
      return;
    }

    tbody.innerHTML = ""; // limpa tabela anterior
    let total = 0;

    // Adiciona bebida
    let linhaBebida = document.createElement('tr');
    let tdItemBebida = document.createElement('td');
    let tdPrecoBebida = document.createElement('td');
    tdItemBebida.textContent = bebidaSelecionada.value;
    tdPrecoBebida.textContent = precos[bebidaSelecionada.value].toFixed(2);
    linhaBebida.appendChild(tdItemBebida);
    linhaBebida.appendChild(tdPrecoBebida);
    tbody.appendChild(linhaBebida);
    total += precos[bebidaSelecionada.value];

    // Adiciona comidas
    comidasSelecionadas.forEach(item => {
      let linha = document.createElement('tr');
      let tdItem = document.createElement('td');
      let tdPreco = document.createElement('td');
      tdItem.textContent = item.value;
      tdPreco.textContent = precos[item.value].toFixed(2);
      linha.appendChild(tdItem);
      linha.appendChild(tdPreco);
      tbody.appendChild(linha);
      total += precos[item.value];
    });

    // Atualiza nome e total
    nomeClienteSpan.textContent = nome;
    totalPedido.textContent = total.toFixed(2);
  });
});