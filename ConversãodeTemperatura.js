function converterTemperatura(temp) {
  if (temp.escala === 'C') {
    return { valor: temp.valor * 1.8 + 32, escala: 'F' };
  } else if (temp.escala === 'F') {
    return { valor: (temp.valor - 32) / 1.8, escala: 'C' };
  } else {
    return "Escala inválida.";
  }
}

console.log(converterTemperatura({valor: 0, escala: 'C'})); // { valor: 32, escala: 'F' }
