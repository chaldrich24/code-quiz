var startButtonEl = document.querySelector("#begin-btn");
var mainEl = document.querySelector("#quiz-content");
var questions = [
    {question: "What",
    answers: ["dog","cat"]
    },
    {question: "Where",
    wrongOne: "Dog",
    wrongTwo: "Cat",
    wrongThree: "Duck",
    correct: "Bat"
    },
    {question: "Where",
    wrongOne: "Dog",
    wrongTwo: "Cat",
    wrongThree: "Duck",
    correct: "Bat"
    }
];
var questionCounter = 0;
console.dir(questions);


var startQuiz = function() {
    mainEl.innerHTML = "";
    askQuestion();
};

var askQuestion = function() {
    var questionEl = document.createElement("div");
    questionEl.innerHTML = "<h1 class='main-title'>" + questions[questionCounter].question + "</h1><button type='button'>" + questions[questionCounter].answers[0] + "</button>";
    mainEl.appendChild(questionEl);
};

startButtonEl.addEventListener("click", startQuiz);
