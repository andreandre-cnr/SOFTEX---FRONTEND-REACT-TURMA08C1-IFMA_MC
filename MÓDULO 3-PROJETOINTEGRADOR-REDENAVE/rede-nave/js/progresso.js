// Função de notificação (toast)
function showToast(msg) {
  const container = document.querySelector('.toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast align-items-center text-bg-primary border-0 show mb-2';
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${msg}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Dados iniciais
let progresso = JSON.parse(localStorage.getItem('progresso')) || { concluido: 72, pendente: 28 };
const ctx = document.getElementById('graficoProgresso');
const texto = document.getElementById('graficoTexto');

// Criação do gráfico com animação de progresso
const chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Concluído', 'Pendente'],
    datasets: [{
      data: [0, 100], // começa em 0 para animar
      backgroundColor: ['#7A2E6C', '#E4B7E5'],
      borderWidth: 0,
      cutout: '70%'
    }]
  },
  options: {
    animation: {
      duration: 2000,
      easing: 'easeOutCubic',
      onProgress: function(animation) {
        const progressoAtual = Math.floor(animation.currentStep / animation.numSteps * progresso.concluido);
        texto.textContent = progressoAtual + '%';
      },
      onComplete: function() {
        texto.textContent = progresso.concluido + '%';
      }
    },
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

// Atualiza o gráfico com animação
setTimeout(() => {
  chart.data.datasets[0].data = [progresso.concluido, progresso.pendente];
  chart.update();
}, 200);

// Botão de certificado
document.getElementById('btnCertificado').addEventListener('click', () => {
  showToast('🎉 Parabéns! Seu certificado foi emitido com sucesso.');
});
