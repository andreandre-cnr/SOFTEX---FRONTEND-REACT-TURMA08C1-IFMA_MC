document.addEventListener('DOMContentLoaded', () => {
  const btnCalcular = document.querySelector('#btnCalcular');
  const btnLimpar = document.querySelector('#btnLimpar');
  const nomeCliente = document.querySelector('#nomeCliente');
  const listaPedidos = document.querySelector('#listaPedidos');
  const totalPedido = document.querySelector('#totalPedido');

  const precos = {
    Suco: 5.00,
    Refrigerante: 6.00,
    Água: 3.00,
    Pastel: 7.00,
    Coxinha: 6.50,
    'Pão de Queijo': 4.00,
    Bolo: 4.50,
    Brigadeiro: 2.50,
    Pirulito: 1.50
  };

  btnCalcular.addEventListener('click', () => {
    const nome = document.querySelector('#nome').value.trim();
    if (!nome) {
      alert('Digite o nome do cliente!');
      return;
    }

    nomeCliente.textContent = nome;
    listaPedidos.innerHTML = '';
    let total = 0;

    for (const item in precos) {
      const input = document.querySelector(`input[name="${item}"]`);
      const quantidade = parseInt(input.value) || 0;

      if (quantidade > 0) {
        const subtotal = quantidade * precos[item];
        total += subtotal;

        const p = document.createElement('p');
        p.textContent = `${item} x${quantidade} — R$ ${subtotal.toFixed(2)}`;
        listaPedidos.appendChild(p);
      }
    }

    totalPedido.textContent = `R$ ${total.toFixed(2)}`;
  });

  btnLimpar.addEventListener('click', () => {
    nomeCliente.textContent = '';
    listaPedidos.innerHTML = '';
    totalPedido.textContent = 'R$ 0,00';
  });
});
