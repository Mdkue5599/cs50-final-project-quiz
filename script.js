const questions = [
  {
    question: "What is the capital of France?",
    answers: ["London", "Paris", "Berlin", "Madrid"],
    correct: "Paris"
  },
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correct: "4"
  },
  {
    question: "Which language is used for web apps?",
    answers: ["Python", "JavaScript", "C++", "Java"],
    correct: "JavaScript"
  },
  {
    question: "Who developed the theory of relativity?",
    answers: ['Newton', 'Einstein', 'Tesla', 'Galileo'],
    correct: "Einstein"
  },
  {
    question: "What planet is known as the Red Planet?",
    answers: ['Earth', 'Venus', 'Mars', 'Jupiter'],
    correct: "Mars"
  },
  {
    question: "Which ocean is the largest?",
    answers: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    correct: "Pacific"
  },
  {
    question: "What is the largest mammal?",
    answers: ['Elephant', 'Blue Whale', 'Giraffe', 'Rhino'],
    correct: "Blue Whale"
  },
  {
    question: "How many continents are there?",
    answers: ['5', '6', '7', '8'],
    correct: "7"
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: ['Oxygen', 'Hydrogen', 'Nitrogen', 'Carbon Dioxide'],
    correct: "Carbon Dioxide"
  },
  {
    question: "What is H2O more commonly known as?",
    answers: ['Oxygen', 'Water', 'Salt', 'Hydrogen'],
    correct: "Water"
  }
];

let currentQuestion = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let timer;
let timeLeft = 10;

const questionEl    = document.getElementById("question");
const answersEl     = document.getElementById("answers");
const nextBtn       = document.getElementById("next-btn");
const resultEl      = document.getElementById("result");
const scoreEl       = document.getElementById("score");
const currScoreEl   = document.getElementById("current-score");
const highScoreEl   = document.getElementById("high-score");

highScoreEl.textContent = highScore;
updateScoreDisplay();

function showQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  updateTimerDisplay();

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.className = "bg-white text-gray-800 py-2 px-4 rounded-xl shadow hover:bg-green-100 transition";
    btn.onclick = () => selectAnswer(ans);
    answersEl.appendChild(btn);
  });
}

function updateTimerDisplay() {
  questionEl.innerHTML = 
    `${questions[currentQuestion].question}
     <span class="text-red-500 text-lg ml-2">(${timeLeft}s)</span>`;
}

function selectAnswer(ans) {
  clearInterval(timer);
  const correctAns = questions[currentQuestion].correct;
  if (ans === correctAns) {
    score++;
  }
  updateScoreDisplay();
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion++;
  nextBtn.classList.add("hidden");
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultEl.classList.remove("hidden");

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreEl.textContent = highScore;
  }
  scoreEl.textContent = `Your score: ${score}/${questions.length}`;
}

function updateScoreDisplay() {
  currScoreEl.textContent = score;
  highScoreEl.textContent = highScore;
}

nextBtn.onclick = nextQuestion;
showQuestion();
