var startButtonEl = document.querySelector("#begin-btn");
var mainEl = document.querySelector("#quiz-content");
var questions = [
    {question: "What",
    answers: ["dog","cat"],
    result: ["correct","wrong"]
    },
    {question: "Who",
    answers: ["dog","cat"],
    result: ["correct","wrong"]
    }
];
var questionCounter = 0;
var score = 0;

var askQuestion = function() {
    mainEl.innerHTML = "";
    var questionEl = document.createElement("div");
    questionEl.innerHTML = "<h1 class='main-title'>" + questions[questionCounter].question + "</h1>";
    questionEl.appendChild(generateAnswers());
    mainEl.appendChild(questionEl);
    document.querySelector(".answers-container").addEventListener("click", displayResult);
};

var generateAnswers = function() {
    var answerContEl = document.createElement("div");
    answerContEl.className = "answers-container";
    var currentQuestion = questions[questionCounter];
    for (i = 0; i < currentQuestion.answers.length; i++) {
        var answerButtonEl = document.createElement("button");
        answerButtonEl.type = "button";
        answerButtonEl.className = "answer-btn";
        if (currentQuestion.result[i] === "correct") {
            answerButtonEl.setAttribute("value","correct");
        }
        else {
            answerButtonEl.setAttribute("value", "incorrect");
        }
        answerButtonEl.innerHTML = currentQuestion.answers[i];
        answerContEl.appendChild(answerButtonEl);
    }
    return answerContEl;
};

var displayResult = function(event) {
    selectedAnswer = event.target.value;
    document.querySelector(".answers-container").removeEventListener("click", displayResult);
    if (selectedAnswer === "correct") {
        alert("Correct!");
        score++;
    }
    else {
        alert("Incorrect.")
    }
    questionCounter++;
    if (questionCounter === questions.length) {
        console.log("Youre done");
        quizOver();
    }
    else {
        askQuestion();
    }
};

var quizOver = function() {
    mainEl.innerHTML = "";
    var scorePage = document.createElement("div");
    scorePage.innerHTML = "<h1>All Done!</h1><p>Your final score is " + score + ".</p>";
    scorePage.className = "score-page";

    var enterScore = document.createElement("div");
    enterScore.innerHTML = "<form class='score-form'><p>Enter initials: </p><div><input type='text' /></div><div><button type='submit'>Submit</submit></div></form>";
    
    scorePage.appendChild(enterScore);
    mainEl.appendChild(scorePage);
}

startButtonEl.addEventListener("click", askQuestion);

