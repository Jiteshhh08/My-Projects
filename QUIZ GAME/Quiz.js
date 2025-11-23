const startScreen = document.getElementById('Start_screen')
const quizScreen = document.querySelector('.Quiz_screen')
const resultScreen = document.querySelector('.Result_screen')
const startBtn = document.querySelector('.Start_btn')
const QuesText = document.querySelector('.Questions')
const answerContainer = document.querySelector('.Ans_container')
const quessNum = document.querySelector('.Quess_num')
const totalQuess = document.querySelector('.Total_quess')
const currQuess = document.querySelector('.Curr_quess')
const scoreSpan = document.querySelector('.Score')
const currScore = document.querySelector('.Curr_score')
const Totalscore = document.querySelector('.Total_score')
const Msg = document.querySelector('.Msg')
const Restart = document.querySelector('#Restart')
const progressBar = document.querySelector('.Progress')



const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];


let currQuestionIndex = 0
let Score = 0
let answerDisabled = false

totalQuess.textContent = quizQuestions.length
Totalscore.textContent = quizQuestions.length

//Event listners

startBtn.addEventListener('click', startQuiz)
Restart.addEventListener('click', restartQuiz)

function startQuiz(){
    currQuestionIndex = 0
    Score = 0
    scoreSpan.textContent = 0
    startScreen.classList.remove('active')
    quizScreen.classList.add('active')

    showQuestion()
}

function showQuestion(){
    answerDisabled = false
    const currentQuestion = quizQuestions[currQuestionIndex]

    currQuess.textContent = currQuestionIndex + 1

    const percentProgressBar = ( currQuestionIndex / quizQuestions.length ) *100

    progressBar.style.width = percentProgressBar + "%"

    QuesText.textContent = currentQuestion.question

    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("Ans_btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answerContainer.appendChild(button);
  });
}


function selectAnswer(e){
    if(answerDisabled){
        return
    }

    answerDisabled = true

    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true'
    // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
    Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedBtn) {
      button.classList.add("incorrect");
    }
    });

    if (isCorrect) {
    Score++;
    scoreSpan.textContent = Score;
  }

  setTimeout(() => {
    currQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  Totalscore.textContent = Score;

  const percentage = (Score / quizQuestions.length) * 100;

  if (percentage === 100) {
    Msg.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    Msg.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    Msg.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    Msg.textContent = "Not bad! Try again to improve!";
  } else {
    Msg.textContent = "Keep studying! You'll get better!";
  }
}


function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}