document.addEventListener('DOMContentLoaded', () => {
    const inputNome = document.querySelector('#nome');           // Campo Nome
    const inputQuant = document.querySelector('#quantidade');    // Campo Quantidade
    const inputValor = document.querySelector('#valor');         // Campo Valor
    const tbody = document.querySelector('tbody');               // Seleciona o <tbody> da tabela
    const btnCadastro = document.querySelector('#btnCadastro');  // Botão de cadastro

    // Verificação de elementos
    if (!inputNome || !inputQuant || !inputValor || !btnCadastro || !tbody) {
      console.error('Algum elemento não foi encontrado no DOM.');
      return;
    }

    // UM ÚNICO addEventListener para o botão
    btnCadastro.addEventListener('click', function(event) {
        event.preventDefault();

        // Coleta os valores
        let campos = [inputNome.value, inputQuant.value, inputValor.value];

        // Log no console (só para conferência)
        console.log('Valores digitados:', campos);

        // Cria a linha da tabela
        let linha = document.createElement('tr');

        // Para cada valor do array, cria uma célula <td> e adiciona na linha
        campos.forEach(function(campo) {
            let celula = document.createElement('td');
            celula.textContent = campo;
            linha.appendChild(celula); // Adiciona a célula à linha
            
        });

        let celulaSubTotal.textcontent = document.createElement('td');
        let celulaSubTotal.textcontent = subtotal
        let celulaSubTotal.classlist = 'text-center subtotal-js'
        
        
        // Adiciona a linha ao tbody da tabela
        tbody.appendChild(linha);
        

        // Limpa os campos do formulário (opcional)
        calculaTotal(document.querySelectorAll('.subTotal-js'))
        function limpaformulario() {
        }
        function calculaTotal(vetSubtotal){
            let total = 0
            total = total + parseFloat(subtotal.textContent)
            vetSubtotal.forEach(funcion(subtotal))
            console.log(subtotal.textContent)
            console.log('total'+ total)
        }
       

        inputNome.value = '';
        inputQuant.value = '';
        inputValor.value = '';
        inputNome.focus()


        // Exibe uma confirmação
        alert('Linha adicionada com sucesso!');

    });
});
