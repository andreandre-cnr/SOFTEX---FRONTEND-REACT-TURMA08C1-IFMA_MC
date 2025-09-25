document.addEventListener('DOMContentLoaded', () => {
    const inputUsuario = document.querySelector('#usuario'); // nome do usuário
    const inputProduto = document.querySelector('#produto'); // nome do produto
    const inputQuant = document.querySelector('#quantidade');
    const inputValor = document.querySelector('#valor');
    const tbody = document.querySelector('#tbodyItemPedido');
    const btnCadastro = document.querySelector('#btnCadastro');
    const totalCell = document.querySelector('.js-total');

    if (!inputUsuario || !inputProduto || !inputQuant || !inputValor || !btnCadastro || !tbody || !totalCell) {
        console.error('Algum elemento não foi encontrado no DOM.');
        return;
    }

    btnCadastro.addEventListener('click', function(event) {
        event.preventDefault();

        // Agora só valida se o usuário já digitou o nome dele antes
        if (!inputUsuario.value.trim()) {
            alert('Digite o nome do usuário primeiro!');
            inputUsuario.focus();
            return;
        }

        let campos = [inputProduto.value, inputQuant.value, inputValor.value];
        console.log('Valores digitados:', campos);

        let linha = document.createElement('tr');

        campos.forEach(function(campo) {
            let celula = document.createElement('td');
            celula.textContent = campo;
            linha.appendChild(celula);
        });

        // Calcula o subtotal e adiciona a célula extra
        let celulaSubTotal = document.createElement('td');
        let subtotal = parseFloat(inputQuant.value) * parseFloat(inputValor.value);
        celulaSubTotal.textContent = subtotal.toFixed(2);
        celulaSubTotal.classList.add('text-center', 'subtotal-js');
        linha.appendChild(celulaSubTotal);

        tbody.appendChild(linha);

        // Recalcula o total geral
        calculaTotal(document.querySelectorAll('.subtotal-js'));

        // Limpa apenas os campos do produto
        inputProduto.value = '';
        inputQuant.value = '';
        inputValor.value = '';
        inputProduto.focus();

        alert('Produto adicionado com sucesso!');
    });

    function calculaTotal(vetSubtotal){
        let total = 0;
        vetSubtotal.forEach(celula => {
            total += parseFloat(celula.textContent);
        });
        totalCell.textContent = total.toFixed(2);
    }
});