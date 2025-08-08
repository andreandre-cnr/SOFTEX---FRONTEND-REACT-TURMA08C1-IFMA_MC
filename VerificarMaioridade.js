function verificarIdade(pessoa) {
  if (pessoa.idade >= 18) {
    return `${pessoa.nome} é maior de idade.`;
  } else {
    return `${pessoa.nome} não é maior de idade.`;
  }
}
console.log(verificarIdade({nome: "João", idade: 17}));
