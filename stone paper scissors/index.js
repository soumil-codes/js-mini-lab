const playerChoice = document.getElementById("playerChoice");
const computerChoice = document.getElementById("computerChoice");
const result = document.getElementById("result");
const score = document.getElementById("scoreValue");

const stone1 = document.getElementById("stone1");
const paper1 = document.getElementById("paper1");
const scissors1 = document.getElementById("scissors1");

const stone2 = document.getElementById("stone2");
const paper2 = document.getElementById("paper2");
const scissors2 = document.getElementById("scissors2");

const playerElements = [stone1, paper1, scissors1];
const computerElements = [stone2, paper2, scissors2];
const choiceNames = ["Rock", "Paper", "Scissors"];

let playerScore = 0;
let computerScore = 0;
let isAnimating = false;

// Add animationend listeners to clean up classes
[...playerElements, ...computerElements].forEach(el => {
    el.addEventListener("animationend", () => {
        el.classList.remove("animate1", "animate2", "animate3", "animate4");
    });
});

function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

function getOutcome(player, computer) {
    if (player === computer) return "tie";
    if ((player === 0 && computer === 2) || (player === 1 && computer === 0) || (player === 2 && computer === 1)) {
        return "win";
    }
    return "lose";
}

function animatePlayerChoice(index) {
    const element = playerElements[index];
    element.classList.add("animate1");

    element.addEventListener("animationend", function handler() {
        element.classList.remove("animate1");
        element.classList.add("animate2");

        element.addEventListener("animationend", function handler2() {
            element.classList.remove("animate2");
            isAnimating = false; // Allow input again
            element.removeEventListener("animationend", handler2);
        });

        element.removeEventListener("animationend", handler);
    });
}

function animateComputerChoice(index) {
    const element = computerElements[index];
    element.classList.add("animate3");

    element.addEventListener("animationend", function handler() {
        element.classList.remove("animate3");
        element.classList.add("animate4");

        element.addEventListener("animationend", function handler2() {
            element.classList.remove("animate4");
            element.removeEventListener("animationend", handler2);
        });

        element.removeEventListener("animationend", handler);
    });
}

function playGame(imgEl) {
    if (isAnimating) return; // Disable rapid clicks
    isAnimating = true;

    const player = Number(imgEl.getAttribute("data-choice"));
    const computer = getComputerChoice();

    animatePlayerChoice(player);
    animateComputerChoice(computer);

    const outcome = getOutcome(player, computer);

    playerChoice.innerText = choiceNames[player];
    computerChoice.innerText = choiceNames[computer];

    if (outcome === "win") {
        result.innerText = "You win!";
        result.style.color = "chartreuse";
        playerScore++;
    } else if (outcome === "lose") {
        result.innerText = "You lose!";
        result.style.color = "red";
        computerScore++;
    } else {
        result.innerText = "It's a Tie!";
        result.style.color = "blue";
    }

    updateScore();
}

function updateScore() {
    score.innerText = `${playerScore} - ${computerScore}`;
}

function reset() {
    playerScore = 0;
    computerScore = 0;
    isAnimating = false;

    playerChoice.innerText = "Choose";
    computerChoice.innerText = "Choose";
    result.innerText = "play something!";
    result.style.color = "black";
    updateScore();

    [...playerElements, ...computerElements].forEach(el => {
        el.classList.remove("animate1", "animate2", "animate3", "animate4");
    });
}
