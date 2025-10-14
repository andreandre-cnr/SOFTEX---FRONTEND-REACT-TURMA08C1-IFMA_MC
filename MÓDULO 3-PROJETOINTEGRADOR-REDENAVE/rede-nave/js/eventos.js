document.querySelectorAll('.inscrever-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast('Inscrição confirmada com sucesso!');
  });
});
