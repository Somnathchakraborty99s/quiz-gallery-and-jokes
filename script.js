const toggleBtn=document.querySelector('.toggle_btn')
const toggleBtnIcon=document.querySelector('.toggle_btn i')
const dropDownMenu=document.querySelector('.dropdown_menu')
toggleBtn.onclick=function(){
    dropDownMenu.classList.toggle('open')
    const isOpen =dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
    ? "fa-solid fa-caret-down"
    : 'fa-solid fa-bars'

}
// API FETCH (Jokes API)
    async function getJoke() {
      const jokeEl = document.getElementById("joke");
      jokeEl.textContent = "Loading...";
      try {
        const res = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await res.json();
        jokeEl.textContent = data.setup + " 🤔 " + data.punchline;
      } catch (error) {
        jokeEl.textContent = "Failed to fetch joke. Please try again.";
      }
    }


// Carousel
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel img");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) slide.classList.add("active");
    });
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Show first slide immediately
showSlide(currentSlide);

// Auto slide every 4s
setInterval(() => changeSlide(1), 4000);

//quiz this is
const quizData = [
    {
      question: "Which language is used for styling web pages?",
      options: ["HTML", "CSS", "JavaScript"],
      correct: "CSS"
    },
    {
      question: "Which language is used for web page structure?",
      options: ["HTML", "CSS", "Python"],
      correct: "HTML"
    },
    {
      question: "Which language is used for web interactivity?",
      options: ["C++", "JavaScript", "SQL"],
      correct: "JavaScript"
    },
    {
      question: "Which tag is used to insert an image in HTML?",
      options: ["<link>", "<img>", "<src>"],
      correct: "<img>"
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");
  const nextBtn = document.getElementById("next-btn");
  const scoreEl = document.getElementById("score");

  function loadQuestion() {
    feedbackEl.textContent = "";
    nextBtn.style.display = "none";
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;

    optionsEl.innerHTML = "";
    currentQuiz.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.classList.add("option");
      btn.onclick = () => checkAnswer(option);
      optionsEl.appendChild(btn);
    });
  }

  function checkAnswer(answer) {
    const correct = quizData[currentQuestion].correct;
    if (answer === correct) {
      feedbackEl.textContent = "✅ Correct!";
      feedbackEl.style.color = "green";
      score++;
    } else {
      feedbackEl.textContent = `❌ Wrong! Correct answer: ${correct}`;
      feedbackEl.style.color = "red";
    }
    nextBtn.style.display = "inline-block";
  }

  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }

  function showScore() {
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    nextBtn.style.display = "none";
    scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
  }

  loadQuestion();