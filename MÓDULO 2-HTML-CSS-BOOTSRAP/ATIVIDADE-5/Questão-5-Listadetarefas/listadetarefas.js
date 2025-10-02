const btnAdicionar = document.getElementById("btnAdicionar");
const inputTarefa = document.getElementById("novaTarefa");
const listaTarefas = document.getElementById("listaTarefas");

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
  const texto = inputTarefa.value.trim();
  if (texto === "") {
    alert("Digite uma tarefa antes de adicionar!");
    return;
  }

  // Criar elemento li
  const li = document.createElement("li");
  li.textContent = texto;

  // Botão de remover
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.className = "remover";

  btnRemover.addEventListener("click", () => {
    listaTarefas.removeChild(li);
  });

  // Marcar como concluída ao clicar na tarefa
  li.addEventListener("click", (e) => {
    if(e.target !== btnRemover) { // não marcar se clicou no botão remover
      li.classList.toggle("completed");
    }
  });

  li.appendChild(btnRemover);
  listaTarefas.appendChild(li);

  inputTarefa.value = "";
  inputTarefa.focus();
}

// Evento do botão
btnAdicionar.addEventListener("click", adicionarTarefa);

// Permitir adicionar pressionando Enter
inputTarefa.addEventListener("keypress", function(e){
  if(e.key === "Enter") {
    e.preventDefault();
    adicionarTarefa();
  }
});
