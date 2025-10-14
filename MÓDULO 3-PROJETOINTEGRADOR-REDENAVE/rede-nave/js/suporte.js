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

document.getElementById('formSuporte').addEventListener('submit', e => {
  e.preventDefault();
  showToast('📩 Mensagem enviada! Nossa equipe responderá em breve.');
  e.target.reset();
});