document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#formEmprestimo');
  const tbody = document.querySelector('#tabelaAmortizacao tbody');
  const totalSpan = document.querySelector('#total');
  const parcelaSpan = document.querySelector('#parcela');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Coleta e converte valores
    const valor = parseFloat(document.querySelector('#valor').value);
    const parcelas = parseInt(document.querySelector('#parcelas').value, 10);
    const juros = parseFloat(document.querySelector('#juros').value) / 100;

    if (valor <= 0 || parcelas < 1 || parcelas > 36 || juros < 0) {
      alert('Verifique os valores informados!');
      return;
    }

    // Fórmula de cálculo da parcela (juros compostos)
    const parcela = valor * (juros * Math.pow(1 + juros, parcelas)) / (Math.pow(1 + juros, parcelas) - 1);
    const total = parcela * parcelas;

    // Mostra valores finais
    totalSpan.textContent = `R$ ${total.toFixed(2)}`;
    parcelaSpan.textContent = `R$ ${parcela.toFixed(2)}`;

    // Limpa tabela anterior
    tbody.innerHTML = '';

    // Gera tabela de amortização
    let saldo = valor;
    for (let i = 1; i <= parcelas; i++) {
      const jurosDoMes = saldo * juros;
      const amortizacao = parcela - jurosDoMes;
      saldo -= amortizacao;

      const linha = document.createElement('tr');

      const celParcela = document.createElement('td');
      celParcela.textContent = i;
      linha.appendChild(celParcela);

      const celValor = document.createElement('td');
      celValor.textContent = `R$ ${parcela.toFixed(2)}`;
      linha.appendChild(celValor);

      const celSaldo = document.createElement('td');
      celSaldo.textContent = `R$ ${saldo > 0 ? saldo.toFixed(2) : '0.00'}`;
      linha.appendChild(celSaldo);

      tbody.appendChild(linha);
    }
  });
});