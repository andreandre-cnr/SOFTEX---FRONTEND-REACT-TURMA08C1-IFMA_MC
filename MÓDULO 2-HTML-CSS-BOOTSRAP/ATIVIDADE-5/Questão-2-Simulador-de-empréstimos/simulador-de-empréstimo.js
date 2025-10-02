document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#formEmprestimo');
  const totalSpan = document.querySelector('#total');
  const parcelaSpan = document.querySelector('#parcela');
  const tbody = document.querySelector('#tabelaAmortizacao tbody');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // impede reload da página

    // Pega valores do formulário
    const valor = parseFloat(document.querySelector('#valor').value);
    const parcelas = parseInt(document.querySelector('#parcelas').value);
    const juros = parseFloat(document.querySelector('#juros').value) / 100; // converte % p/ decimal

    if (isNaN(valor) || isNaN(parcelas) || isNaN(juros)) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    // Fórmula de prestação fixa (Price)
    const parcela = (valor * juros) / (1 - Math.pow(1 + juros, -parcelas));
    const total = parcela * parcelas;

    // Mostra resultados principais
    totalSpan.textContent = total.toFixed(2);
    parcelaSpan.textContent = parcela.toFixed(2);

    // Limpa a tabela antes de recriar
    tbody.innerHTML = '';

    // Gera a tabela de amortização
    let saldo = valor;
    for (let i = 1; i <= parcelas; i++) {
      const jurosParcela = saldo * juros;
      const amortizacao = parcela - jurosParcela;
      saldo -= amortizacao;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i}</td>
        <td>${parcela.toFixed(2)}</td>
        <td>${saldo > 0 ? saldo.toFixed(2) : '0.00'}</td>
      `;
      tbody.appendChild(tr);
    }
  });
});
