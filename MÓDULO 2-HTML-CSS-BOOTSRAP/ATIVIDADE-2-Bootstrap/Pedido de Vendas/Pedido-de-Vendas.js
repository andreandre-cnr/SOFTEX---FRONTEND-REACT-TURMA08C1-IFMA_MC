document.addEventListener('DOMContentLoaded', () => {
    const inputUsuario = document.querySelector('#usuario');   // Nome do usuário
    const inputProduto = document.querySelector('#produto');   // Nome do produto
    const inputQuant   = document.querySelector('#quantidade'); // Quantidade
    const inputValor   = document.querySelector('#valor');      // Valor unitário
    const tbody        = document.querySelector('#tbodyItemPedido'); // Corpo da tabela
    const btnCadastro  = document.querySelector('#btnCadastro');// Botão de cadastro
    const totalCell    = document.querySelector('.js-total');   // Total no rodapé

    if (!inputUsuario || !inputProduto || !inputQuant || !inputValor || !btnCadastro || !tbody || !totalCell) {
        console.error('Algum elemento não foi encontrado no DOM.');
        return;
    }

    btnCadastro.addEventListener('click', function(event) {
        event.preventDefault();

        // Nome do usuário só precisa ser informado uma vez
        if (!inputUsuario.value.trim()) {
            alert('Digite o nome do usuário primeiro!');
            inputUsuario.focus();
            return;
        }

        // Validação dos campos do produto
        if (!inputProduto.value.trim() || !inputQuant.value.trim() || !inputValor.value.trim()) {
            alert('Preencha todos os campos do produto!');
            return;
        }

        // Cria a linha da tabela
        let linha = document.createElement('tr');

        let celulaProduto = document.createElement('td');
        celulaProduto.textContent = inputProduto.value;
        linha.appendChild(celulaProduto);

        let celulaQuant = document.createElement('td');
        celulaQuant.textContent = inputQuant.value;
        linha.appendChild(celulaQuant);

        let celulaValor = document.createElement('td');
        celulaValor.textContent = parseFloat(inputValor.value).toFixed(2);
        linha.appendChild(celulaValor);

        let celulaSubTotal = document.createElement('td');
        let subtotal = parseFloat(inputQuant.value) * parseFloat(inputValor.value);
        celulaSubTotal.textContent = subtotal.toFixed(2);
        celulaSubTotal.classList.add('text-center', 'subtotal-js');
        linha.appendChild(celulaSubTotal);

        // Adiciona linha na tabela
        tbody.appendChild(linha);

        // Recalcula o total geral
        calculaTotal(document.querySelectorAll('.subtotal-js'));

        // Limpa somente os campos de produto
        inputProduto.value = '';
        inputQuant.value   = '';
        inputValor.value   = '';
        inputProduto.focus();
    });

    // Função para recalcular total
    function calculaTotal(vetSubtotal){
        let total = 0;
        vetSubtotal.forEach(celula => {
            total += parseFloat(celula.textContent);
        });
        totalCell.textContent = total.toFixed(2);
    }
});