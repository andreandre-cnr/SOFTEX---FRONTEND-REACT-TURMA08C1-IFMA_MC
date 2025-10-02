const quiz = [
  {
    pergunta: "Qual linguagem é usada para estruturar páginas web?",
    alternativas: ["CSS", "JavaScript", "HTML", "Python"],
    correta: 2
  },
  {
    pergunta: "Qual framework CSS facilita a criação de layouts responsivos?",
    alternativas: ["Django", "Bootstrap", "React", "Node.js"],
    correta: 1
  },
  {
    pergunta: "Qual comando exibe mensagens no console do navegador?",
    alternativas: ["print()", "echo()", "console.log()", "alert()"],
    correta: 2
  }
];

const quizContainer = document.getElementById("quizContainer");
const quizForm = document.getElementById("quizForm");
const resultadoDiv = document.getElementById("resultado");

function carregarQuiz() {
  quiz.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "quiz-card";

    const pergunta = document.createElement("h5");
    pergunta.textContent = `${index + 1}. ${q.pergunta}`;
    card.appendChild(pergunta);

    q.alternativas.forEach((alt, i) => {
      const label = document.createElement("label");
      label.className = "quiz-label";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `pergunta${index}`;
      input.value = i;

      label.appendChild(input);
      label.appendChild(document.createTextNode(alt));
      card.appendChild(label);
    });

    quizContainer.appendChild(card);
  });
}

quizForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let pontuacao = 0;
  let feedback = "";

  quiz.forEach((q, index) => {
    const resposta = document.querySelector(`input[name="pergunta${index}"]:checked`);
    if (resposta) {
      const respostaIndex = parseInt(resposta.value);
      if (respostaIndex === q.correta) {
        pontuacao++;
        feedback += `<p>${index + 1}. <span class="correct">Correto!</span></p>`;
      } else {
        feedback += `<p>${index + 1}. <span class="incorrect">Errado!</span> Resposta certa: <b>${q.alternativas[q.correta]}</b></p>`;
      }
    } else {
      feedback += `<p>${index + 1}. <span class="incorrect">Sem resposta!</span> Resposta certa: <b>${q.alternativas[q.correta]}</b></p>`;
    }
  });

  let mensagemFinal = "";
  if (pontuacao === quiz.length) {
    mensagemFinal = "🎉 Excelente! Você acertou todas!";
  } else if (pontuacao >= quiz.length / 2) {
    mensagemFinal = "👍 Muito bem! Você foi razoavelmente bem.";
  } else {
    mensagemFinal = "😢 Continue estudando, você pode melhorar.";
  }

  resultadoDiv.innerHTML = `
    <h4>Resultado</h4>
    ${feedback}
    <p><strong>Pontuação final: ${pontuacao} / ${quiz.length}</strong></p>
    <p>${mensagemFinal}</p>
  `;
  resultadoDiv.classList.remove("d-none");
});

carregarQuiz();
