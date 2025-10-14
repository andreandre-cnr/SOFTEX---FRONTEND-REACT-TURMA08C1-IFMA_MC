const ctx = document.getElementById('graficoProgresso');
const texto = document.getElementById('graficoTexto');

// Dados armazenados ou padrão
let progresso = JSON.parse(localStorage.getItem('progresso')) || { concluido: 65, pendente: 35 };

// Renderiza gráfico
const chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Concluído', 'Pendente'],
    datasets: [{
      data: [progresso.concluido, progresso.pendente],
      backgroundColor: ['#7A2E6C', '#E4B7E5'],
      borderWidth: 0,
      cutout: '70%'
    }]
  },
  options: {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { color: '#555', boxWidth: 12 }
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.parsed}%`
        }
      }
    }
  }
});

// Mostra número central
function atualizarTexto() {
  texto.textContent = `${progresso.concluido}%`;
}
atualizarTexto();

// Botão de certificado
document.getElementById('btnCertificado').addEventListener('click', () => {
  showToast('🎉 Parabéns! Seu certificado foi gerado.');
});
