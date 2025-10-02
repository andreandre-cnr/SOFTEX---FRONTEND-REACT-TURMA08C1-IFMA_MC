document.getElementById("btnCalcular").addEventListener("click", function () {
  const nomeCliente = document.getElementById("nome").value.trim();
  const nomeClienteSpan = document.getElementById("nomeCliente");
  const tbody = document.querySelector("#tabelaResultado tbody");
  const totalPedido = document.getElementById("totalPedido");

  // Limpa tabela antes de adicionar novo cálculo
  tbody.innerHTML = "";
  totalPedido.textContent = "0,00";
  nomeClienteSpan.textContent = "";

  if (nomeCliente === "") {
    alert("Por favor, informe o nome do cliente.");
    return;
  }

  nomeClienteSpan.textContent = nomeCliente;

  // Lista de preços (poderia vir de um JSON ou banco de dados)
  const precos = {
    "Suco": 5.00,
    "Refrigerante": 6.00,
    "Água": 3.00,
    "Bolo": 4.50,
    "Pastel": 7.00,
    "Torta": 5.50
  };

  let total = 0;

  // Pega a bebida selecionada
  const bebida = document.querySelector("input[name='bebida']:checked");
  if (bebida) {
    const item = bebida.value;
    const preco = precos[item];
    adicionarLinha(tbody, item, preco);
    total += preco;
  }

  // Pega as comidas selecionadas
  const comidas = document.querySelectorAll("input[name='comida']:checked");
  comidas.forEach(c => {
    const item = c.value;
    const preco = precos[item];
    adicionarLinha(tbody, item, preco);
    total += preco;
  });

  // Atualiza total formatado
  totalPedido.textContent = total.toFixed(2).replace(".", ",");
});

function adicionarLinha(tbody, item, preco) {
  const linha = document.createElement("tr");
  linha.innerHTML = `<td>${item}</td><td>${preco
