const btnAdicionar = document.getElementById("btnAdicionar");
const inputTarefa = document.getElementById("novaTarefa");
const listaTarefas = document.getElementById("listaTarefas");

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();
  if (texto === "") {
    alert("Digite uma tarefa antes de adicionar!");
    return;
  }

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.textContent = texto;

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.className = "btn btn-danger btn-sm remover";

  btnRemover.addEventListener("click", () => {
    listaTarefas.removeChild(li);
  });

  li.addEventListener("click", (e) => {
    if (e.target !== btnRemover) {
      li.classList.toggle("completed");
    }
  });

  li.appendChild(btnRemover);
  listaTarefas.appendChild(li);

  inputTarefa.value = "";
  inputTarefa.focus();
}

btnAdicionar.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    adicionarTarefa();
  }
});
