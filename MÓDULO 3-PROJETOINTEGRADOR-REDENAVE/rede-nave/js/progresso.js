const ctx = document.getElementById('graficoProgresso');
let progresso = JSON.parse(localStorage.getItem('progresso')) || { concluido: 60, pendente: 40 };

const chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Concluído', 'Pendente'],
    datasets: [{ data: [progresso.concluido, progresso.pendente], backgroundColor: ['#7A2E6C', '#E4B7E5'] }]
  }
});

document.getElementById('btnCertificado').addEventListener('click', () => {
  showToast('🎉 Parabéns! Seu certificado foi gerado.');
});
