// ============================================
// QUIZ APP - WORKING WITH YOUR HTML
// ============================================

// ----- GET HTML ELEMENTS -----
let questionEl = document.querySelector(".question");
let list = document.getElementById("options");
let progressEl = document.getElementById("progress");
let skipBtn = document.getElementById("skip-btn");
let nextBtn = document.getElementById("next-btn");

// Result screen elements (from your HTML)
let mainQuiz = document.querySelector(".container");
let endResult = document.querySelector(".show-result");
let resultp = document.getElementById("resultp");
let resultn = document.getElementById("resultn");
let restartBtn = document.querySelector(".restartButton");

// ----- QUIZ STATE -----
let currentQuestionIndex = 0;
let score = 0;

// 🔴 FIX #1: Changed from 0 to null
// (0 means first option, null means nothing selected)
let selectedAnswer = null;

const TOTAL_QUESTIONS = 10;

// ----- SHUFFLE FUNCTION -----
function shuffleArray(array) {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random questions
let quizQuestions = shuffleArray(questions).slice(0, TOTAL_QUESTIONS);

// ----- LOAD QUESTION -----
function loadQuestion() {
  // Reset selected answer
  selectedAnswer = null;

  // 🔴 FIX #2: Disable next button until user selects an answer
  nextBtn.disabled = true;

  // Get current question
  let currentQuestion = quizQuestions[currentQuestionIndex];

  // Update question text and progress
  questionEl.textContent = currentQuestion.question;
  progressEl.textContent = currentQuestionIndex + 1 + "/" + TOTAL_QUESTIONS;

  // Clear old options
  list.innerHTML = "";

  // Letters for options
  let letters = ["A", "B", "C", "D"];

  // Create options
  currentQuestion.options.forEach(function (option, index) {
    let li = document.createElement("li");
    li.className = "option";
    li.setAttribute("data-index", index);
    li.innerHTML = "<span>" + letters[index] + ".</span> " + option;

    li.addEventListener("click", function () {
      selectOption(index);
    });

    list.appendChild(li);
  });
}

// ----- SELECT OPTION -----
function selectOption(index) {
  // Save selected answer
  selectedAnswer = index;

  // Enable next button
  nextBtn.disabled = false;

  // 🔴 FIX #3: Get options FRESH (they are created dynamically)
  let allOptions = document.querySelectorAll(".option");

  // Remove "selected" from ALL options
  allOptions.forEach(function (option) {
    option.classList.remove("selected");
  });

  // 🔴 FIX #4: Add "selected" ONLY to clicked option (not all!)
  allOptions[index].classList.add("selected");
}

// ----- CHECK ANSWER -----
function checkAnswer() {
  if (selectedAnswer === null) {
    return;
  }

  let currentQuestion = quizQuestions[currentQuestionIndex];

  // 🔴 FIX #5: Get options FRESH here too
  let allOptions = document.querySelectorAll(".option");

  // Disable clicking
  allOptions.forEach(function (option) {
    option.style.pointerEvents = "none";
  });

  // Check answer
  if (selectedAnswer === currentQuestion.correct) {
    score++;
    allOptions[selectedAnswer].classList.add("correct");
  } else {
    allOptions[selectedAnswer].classList.add("wrong");
    allOptions[currentQuestion.correct].classList.add("correct");
  }
}

// ----- NEXT QUESTION -----
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= TOTAL_QUESTIONS) {
    showResult();
  } else {
    loadQuestion();
  }
}

// ----- SKIP QUESTION -----
function skipQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= TOTAL_QUESTIONS) {
    showResult();
  } else {
    loadQuestion();
  }
}

// ----- SHOW RESULT -----
function showResult() {
  let percentage = Math.round((score / TOTAL_QUESTIONS) * 100);

  // Hide quiz, show result
  mainQuiz.style.display = "none";
  endResult.style.display = "block";

  // Update result text
  resultp.textContent = percentage + "%";
  resultn.textContent =
    "You got " + score + " / " + TOTAL_QUESTIONS + " correct!";

  // Restart button
  restartBtn.onclick = function () {
    location.reload();
  };
}

// ----- EVENT LISTENERS -----
nextBtn.addEventListener("click", function () {
  checkAnswer();

  setTimeout(function () {
    nextQuestion();
  }, 1000);
});

skipBtn.addEventListener("click", function () {
  skipQuestion();
});

// ----- HIDE RESULT SCREEN & START QUIZ -----
endResult.style.display = "none";

// 🔴 FIX #6: Call loadQuestion only ONCE
loadQuestion();
