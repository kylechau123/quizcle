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
        "Answers": ["first", "second", "third","fourth"],
        "Correct-answer": "second",
    },
    {
        "Question-title": "What is an object?",
        "Answers": ["1st", "second", "third","fourth"],
        "Correct-answer": "1st",
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