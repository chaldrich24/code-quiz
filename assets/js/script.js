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
    },
    {question: "Where",
    answers: ["dog","cat"],
    result: ["correct","wrong"]
    },
    {question: "Why",
    answers: ["dog","cat"],
    result: ["correct","wrong"]
    }
];
var questionCounter = 0;
var score = 0;
var highScoreList = [];

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
        console.log("Correct!");
        score++;
    }
    else {
        console.log("Incorrect.");
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
    var scoreForm = document.createElement("div");
    scoreForm.innerHTML = "<h1>All Done!</h1><p>Your final score is " + score + ".</p>";
    scoreForm.className = "score-page";

    var enterScore = document.createElement("div");
    enterScore.innerHTML = "<form class='score-form' id='score-form'><p>Enter initials: </p><div><input type='text' name='initials' /></div><div><button type='submit' id='submit-score'>Submit</submit></div></form>";
    scoreForm.appendChild(enterScore);
    mainEl.appendChild(scoreForm);
    document.querySelector("#score-form").addEventListener("submit", formScoreHandler);
};

var formScoreHandler = function(event) {
    event.preventDefault();
    var initialsInput = document.querySelector("input[name='initials']").value;
    var scoreObj = {initials: initialsInput, score: score};

    highScoreList.push(scoreObj);
    localStorage.setItem("high-score", JSON.stringify(highScoreList));
    showScores();
};

var loadScores = function() {
    var storedScores = localStorage.getItem("high-score");
    storedScores = JSON.parse(storedScores);

    if (!storedScores) {
        return false;
    }

    for (var i = 0; i < storedScores.length; i++) {
        highScoreList.push(storedScores[i]);
    }
};

var showScores = function() {
    mainEl.innerHTML = "";
    var scoreListPage = document.createElement("div");
    scoreListPage.className = "score-list-page";

    var scoreListPageHeading = document.createElement("h1");
    scoreListPageHeading.innerHTML = ("High scores");

    var scoreList = document.createElement("ul");
    var highScoreList = orderScores();
    for (i = 0; i < highScoreList.length; i++) {
        var scoreEl = document.createElement("li");
        scoreEl.innerHTML = (i + 1) + ". " + highScoreList[i].initials + " - " + highScoreList[i].score;

        // add alternating styling
        if (i%2 === 0) {
            scoreEl.className = "primary-score";
        }
        else {
            scoreEl.className = "secondary-score";
        }
        scoreList.appendChild(scoreEl);
    }

    scoreListPage.appendChild(scoreListPageHeading);
    scoreListPage.appendChild(scoreList);
    
    mainEl.appendChild(scoreListPage);
}

var orderScores = function() {
    highScoreList.sort((a, b)=> {
        return b.score - a.score;
    })
    
    return highScoreList;
}

loadScores();
console.log(highScoreList);
startButtonEl.addEventListener("click", askQuestion);

