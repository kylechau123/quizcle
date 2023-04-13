var timer = document.getElementById("Timer");
var opening = document.getElementById("opening");
var questionEl = document.getElementById("questionEl");
var startBtn = document.getElementById("startBtn");
var closing = document.getElementById("closing");
var scoreEl = document.getElementById("score")
var saveBtn = document.getElementById("save");
var initials = document.getElementById("initials");

var secondsLeft = 75;
var currentIndex = 0
var timerInterval;

var savedScores = JSON.parse(localStorage.getItem("savedScore")) || []

var questions = [
    {
        "Question-title": "What is an array?",
        "Answers": ["A variable", "A name of a storage location", "A compilation of multiple values in a single variable","A set of statements that performs a task or calculates a value"],
        "Correct-answer": "A compilation of multiple values in a single variable",
    },
    {
        "Question-title": "What is an object?",
        "Answers": ["A standalone entity, with properties and type", "A series of characters and is written with quotes", "Represents a non-existent or a invalid value", "A scripting language"],
        "Correct-answer": "A standalone entity, with properties and type",
    },
    {
        "Question-title": "What is a string?",
        "Answers": ["A compilation of multiple values in a single variable", "A sequence of one or more characters that may consist of letters, numbers, or symbols in quotes", "A standalone entity, with properties and type", "A name of a storage location"],
        "Correct-answer": "A sequence of one or more characters that may consist of letters, numbers, or symbols in quotes",
    },
    {
        "Question-title": "Inside which HTML element do we put the JavaScript?",
        "Answers": ["<js>", "<script>", "<JavaScript>", "<jscript>"],
        "Correct-answer": "<script>",
    },
    {
        "Question-title": "Which operator is used to assign a value to a variable?",
        "Answers": ["*", "=", "+", "()"],
        "Correct-answer": "=",
    }
]

function startQuiz() {
    timerInterval = setInterval(function(){
        secondsLeft = secondsLeft - 1;
        timer.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);

    opening.classList.add("hide")

    displayQuestion()
}


function displayQuestion() {
    questionEl.innerHTML = ""

    var questionTitle = document.createElement("h2")

    questionTitle.textContent = questions[currentIndex]["Question-title"]

    questionEl.appendChild(questionTitle)
    
    for(i = 0; i < 4; i++) {

    var choice = document.createElement('button')
    
    choice.classList.add("list-group-item", "list-group-item-action")
    
    choice.textContent = questions[currentIndex]["Answers"][i]

    choice.addEventListener('click', nextQuestion)

    questionEl.appendChild(choice)
    }
}

function nextQuestion(event) {
    var userAnswer = event.target.textContent
    var correctAnswer = questions[currentIndex]["Correct-answer"]
    if(userAnswer == correctAnswer){
        console.log("correct")
    }else {
        secondsLeft -= 10
    }

    currentIndex++

    if(currentIndex < questions.length) {
        displayQuestion()
    } else {
        endQuiz()
    }

}

function endQuiz () {
    clearInterval(timerInterval);
    timer.textContent = secondsLeft;

    closing.classList.remove("hide");
    questionEl.classList.add("hide");

    scoreEl.textContent = secondsLeft;

}

function saveScore () {
    var data = {
        score: secondsLeft,
        initials: initials.value
    }

    savedScores.push(data)

    localStorage.setItem("savedScore", JSON.stringify(savedScores));

    window.location.href = "./highscores.html"
}

startBtn.addEventListener("click", startQuiz);
saveBtn.addEventListener("click", saveScore)