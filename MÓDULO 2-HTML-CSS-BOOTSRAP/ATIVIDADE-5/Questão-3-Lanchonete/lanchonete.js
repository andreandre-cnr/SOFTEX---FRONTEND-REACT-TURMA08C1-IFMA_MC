document.getElementById("btnCalcular").addEventListener("click", function () {
  const nomeCliente = document.getElementById("nome").value.trim();
  const nomeClienteSpan = document.getElementById("nomeCliente");
  const cardsContainer = document.getElementById("cardsResultado");
  const totalPedido = document.getElementById("totalPedido");

  // Limpa resultados antigos
  cardsContainer.innerHTML = "";
  totalPedido.textContent = "R$0,00";
  nomeClienteSpan.textContent = "";

  if (!nomeCliente) {
    alert("Informe o nome do cliente!");
    return;
  }
  nomeClienteSpan.textContent = nomeCliente;

  const precos = {
    "Suco": 5.00,
    "Refrigerante": 6.00,
    "Água": 3.00,
    "Bolo": 4.50,
    "Pastel": 7.00,
    "Torta": 5.50
  };

  let totalGeral = 0;

  // Percorre todos os inputs de quantidade
  const inputs = document.querySelectorAll("input[type='number']");
  inputs.forEach(input => {
    const item = input.name;
    const quantidade = parseInt(input.value, 10);
    if (quantidade > 0) {
      const precoUnit = precos[item];
      const subtotal = precoUnit * quantidade;
      totalGeral += subtotal;

      // Cria card para cada item
      const card = document.createElement("div");
      card.className = "pedido-card";
      card.innerHTML = `
        <h4>${item}</h4>
        <p>Quantidade: ${quantidade}</p>
        <p>Preço Unitário: R$${precoUnit.toFixed(2).replace(".", ",")}</p>
        <p>Subtotal: <strong>R$${subtotal.toFixed(2).replace(".", ",")}</strong></p>
      `;
      cardsContainer.appendChild(card);
    }
  });

  totalPedido.textContent = `R$${totalGeral.toFixed(2).replace(".", ",")}`;
});

document.getElementById("btnLimpar").addEventListener("click", function () {
  document.getElementById("nomeCliente").textContent = "";
  document.getElementById("cardsResultado").innerHTML = "";
  document.getElementById("totalPedido").textContent = "R$0,00";
});
