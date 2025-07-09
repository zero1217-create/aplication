const questions = [
  { text: "クジラは魚類である", answer: false },
  { text: "ライオンはネコ科の動物である。", answer: true },
  { text: "ペンギンは空を飛べる。", answer: false },
  { text: "ダチョウは空を飛べる。", answer: false },
];

let current = 0;
let score = 0;

const qEl = document.getElementById("question");
const btns = document.querySelectorAll("#answer-buttons button");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
  const q = questions[current];
  qEl.textContent = q.text;
  feedback.classList.add("hide");
  btns.forEach(b => {
    b.disabled = false;
    b.classList.remove("correct", "incorrect");
  });
  nextBtn.classList.add("hide");
}

function selectAnswer(e) {
  const selected = e.target.dataset.answer === "true";
  const correct = questions[current].answer === selected;
  if (correct) {
    score++;
    e.target.classList.add("correct");
    feedback.textContent = "正解！";
  } else {
    e.target.classList.add("incorrect");
    feedback.textContent = "不正解…";
  }
  feedback.classList.remove("hide");
  btns.forEach(b => b.disabled = true);
  nextBtn.classList.remove("hide");
}

btns.forEach(b => b.addEventListener("click", selectAnswer));

nextBtn.addEventListener("click", () => {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    feedback.textContent = `終了！${questions.length}問中${score}問正解でした！`;
    feedback.classList.remove("hide");
    nextBtn.classList.add("hide");
    restartBtn.classList.remove("hide");
  }
});

restartBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  restartBtn.classList.add("hide");
  showQuestion();
});

showQuestion();
