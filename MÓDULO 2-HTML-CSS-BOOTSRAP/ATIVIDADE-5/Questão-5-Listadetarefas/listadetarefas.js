// Seletores
const tarefaInput = document.getElementById("tarefaInput");
const addBtn = document.getElementById("addBtn");
const listaTarefas = document.getElementById("listaTarefas");

// Função para adicionar tarefa
function adicionarTarefa() {
  const texto = tarefaInput.value.trim();

  if (texto === "") {
    alert("⚠️ Digite uma tarefa antes de adicionar!");
    return;
  }

  // Criar item da lista
  const li = document.createElement("li");
  li.className = "list-group-item";

  const span = document.createElement("span");
  span.textContent = texto;

  // Botões de ação
  const botoesDiv = document.createElement("div");

  const concluirBtn = document.createElement("button");
  concluirBtn.textContent = "✔";
  concluirBtn.className = "btn btn-success btn-sm me-2";
  concluirBtn.addEventListener("click", () => {
    span.classList.toggle("completed");
  });

  const removerBtn = document.createElement("button");
  removerBtn.textContent = "🗑";
  removerBtn.className = "btn btn-danger btn-sm";
  removerBtn.addEventListener("click", () => {
    li.remove();
  });

  botoesDiv.appendChild(concluirBtn);
  botoesDiv.appendChild(removerBtn);

  li.appendChild(span);
  li.appendChild(botoesDiv);

  listaTarefas.appendChild(li);

  // Limpar input
  tarefaInput.value = "";
  tarefaInput.focus();
}

// Eventos
addBtn.addEventListener("click", adicionarTarefa);
tarefaInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") adicionarTarefa();
});