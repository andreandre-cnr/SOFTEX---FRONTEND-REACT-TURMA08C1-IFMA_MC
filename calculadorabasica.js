function calculadora(a, b, operacao) {
  switch (operacao) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/':
      if (b === 0) {
        return "Erro: divisão por zero!";
      }
      return a / b;
    default:
      return "Operação inválida.";
  }
}
console.log(calculadora(10, 5, '+')); // 15
