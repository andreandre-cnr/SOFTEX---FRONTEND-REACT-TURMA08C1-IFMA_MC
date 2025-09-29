document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#formData');
  const inputData = document.querySelector('#dataInput');
  const tbody = document.querySelector('#tabelaResultado tbody');
  const mensagem = document.querySelector('#mensagem');

  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    mensagem.textContent = '';

    const valor = inputData.value.trim();
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = valor.match(regex);

    if (!match) {
      mensagem.textContent = 'Formato inválido! Use dd/mm/aaaa';
      return;
    }

    let [_, diaStr, mesStr, anoStr] = match;
    let dia = parseInt(diaStr, 10);
    let mes = parseInt(mesStr, 10);
    let ano = parseInt(anoStr, 10);

    if (mes < 1 || mes > 12) {
      mensagem.textContent = 'Mês inválido!';
      return;
    }

    const diasPorMes = [31, (anoBissexto(ano) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (dia < 1 || dia > diasPorMes[mes - 1]) {
      mensagem.textContent = 'Dia inválido para o mês informado!';
      return;
    }

    const dataExtenso = `${dia} de ${meses[mes - 1]} de ${ano}`;

    const linha = document.createElement('tr');

    const celulaOriginal = document.createElement('td');
    celulaOriginal.textContent = valor;
    linha.appendChild(celulaOriginal);

    const celulaExtenso = document.createElement('td');
    celulaExtenso.textContent = dataExtenso;
    linha.appendChild(celulaExtenso);

    tbody.appendChild(linha);

    inputData.value = '';
    inputData.focus();
  });

  function anoBissexto(ano) {
    return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
  }
});