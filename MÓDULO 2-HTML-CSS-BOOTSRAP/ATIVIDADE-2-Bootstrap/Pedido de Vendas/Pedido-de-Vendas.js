document.addEventListener('DOMContentLoaded', () => {
    const inputNome = document.querySelector('#nome');
    const inputQuant = document.querySelector('#quantidade');
    const inputValor = document.querySelector('#valor');
    const tbody = document.querySelector('tbody');
    const btnCadastro = document.querySelector('#btnCadastro');

    if (!inputNome || !inputQuant || !inputValor || !btnCadastro || !tbody) {
        console.error('Algum elemento não foi encontrado no DOM.');
        return;
    }

    btnCadastro.addEventListener('click', function(event) {
        event.preventDefault();

        let campos = [inputNome.value, inputQuant.value, inputValor.value];
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

        // Limpa os campos e foca no primeiro
        inputNome.value = '';
        inputQuant.value = '';
        inputValor.value = '';
        inputNome.focus();

        alert('Linha adicionada com sucesso!');
    });

    function calculaTotal(vetSubtotal){
        let total = 0;
        vetSubtotal.forEach(celula => {
            total += parseFloat(celula.textContent);
        });
        console.log('Total: ' + total.toFixed(2));
    }
});