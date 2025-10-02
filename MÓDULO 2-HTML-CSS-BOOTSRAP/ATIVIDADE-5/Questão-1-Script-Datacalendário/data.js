document.getElementById("formData").addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const input = document.getElementById("dataInput").value.trim();
  const mensagem = document.getElementById("mensagem");
  const tbody = document.querySelector("#tabelaResultado tbody");

  // Limpa mensagem de erro
  mensagem.textContent = "";

  // Expressão regular para validar formato dd/mm/aaaa
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = input.match(regex);

  if (!match) {
    mensagem.textContent = "Formato inválido! Use dd/mm/aaaa (ex: 16/01/1986)";
    return;
  }

  let dia = parseInt(match[1], 10);
  let mes = parseInt(match[2], 10);
  let ano = parseInt(match[3], 10);

  // Array com os meses em português
  const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  // Validação básica da data
  if (dia < 1 || dia > 31 || mes < 1 || mes > 12) {
    mensagem.textContent = "Data inválida!";
    return;
  }

  const dataExtenso = `${dia} de ${meses[mes - 1]} de ${ano}`;

  // Adiciona na tabela
  const novaLinha = document.createElement("tr");
  novaLinha.innerHTML = `<td>${input}</td><td>${dataExtenso}</td>`;
  tbody.appendChild(novaLinha);

  // Limpa o campo de input
  document.getElementById("dataInput").value = "";
});