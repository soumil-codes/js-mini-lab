const playerChoice = document.getElementById("playerChoice");
const computerChoice = document.getElementById("computerChoice");
const result = document.getElementById("result");
const score = document.getElementById("scoreValue");
const spamToggle = document.getElementById("spamToggle");

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

function isSpamModeEnabled() {
  return spamToggle.checked;
}

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

function animateSequence(el, anim1, anim2, unlock = false) {
  el.classList.remove(anim1, anim2);
  void el.offsetWidth;
  el.classList.add(anim1);

  el.addEventListener("animationend", function step1() {
    el.classList.remove(anim1);
    void el.offsetWidth;
    el.classList.add(anim2);

    el.addEventListener("animationend", function step2() {
      el.classList.remove(anim2);
      if (unlock) isAnimating = false;
      el.removeEventListener("animationend", step2);
    });

    el.removeEventListener("animationend", step1);
  });
}

function playGame(imgEl) {
  if (isAnimating && !isSpamModeEnabled()) return;
  if (!isSpamModeEnabled()) isAnimating = true;

  const player = Number(imgEl.getAttribute("data-choice"));
  const computer = getComputerChoice();

  animateSequence(playerElements[player], "animate1", "animate2", true);
  animateSequence(computerElements[computer], "animate3", "animate4");

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
  result.innerText = "Play something!";
  result.style.color = "black";
  updateScore();

  [...playerElements, ...computerElements].forEach(el => {
    el.classList.remove("animate1", "animate2", "animate3", "animate4");
  });
}
