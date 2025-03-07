// Game state
let gameState = {
  userScore: 0,
  compScore: 0,
  isBestOf3: false,
  roundsPlayed: 0,
  gameOver: false,
};

// DOM Elements
const choices = document.querySelectorAll(".images");
const msgElement = document.querySelector("h3");
const userScoreElement = document.querySelector("#score1");
const compScoreElement = document.querySelector("#score2");
const resetBtn = document.querySelector("#resetBtn");
const classicModeBtn = document.querySelector("#classicMode");
const bestOf3ModeBtn = document.querySelector("#bestOf3Mode");

// Game logic
const gameRules = {
  Rock: { beats: "Scissors", loses: "Paper" },
  Paper: { beats: "Rock", loses: "Scissors" },
  Scissors: { beats: "Paper", loses: "Rock" },
};

// Helper functions
const updateMessage = (text, color) => {
  msgElement.innerText = text;
  msgElement.style.backgroundColor = color;
  msgElement.style.color = "white";
};

const checkGameOver = () => {
  if (!gameState.isBestOf3) return false;

  if (gameState.userScore >= 2 || gameState.compScore >= 2) {
    gameState.gameOver = true;
    const winner =
      gameState.userScore > gameState.compScore ? "You" : "Computer";
    updateMessage(`${winner} won the Best of 3!`, "#4CAF50");
    return true;
  }
  return false;
};

// Game functions
const genCompChoice = () => {
  const options = ["Rock", "Paper", "Scissors"];
  return options[Math.floor(Math.random() * 3)];
};

const determineWinner = (userChoice, compChoice) => {
  if (userChoice === compChoice) return "draw";
  return gameRules[userChoice].beats === compChoice ? "win" : "lose";
};

const updateScore = (result) => {
  if (result === "win") {
    gameState.userScore++;
    userScoreElement.innerText = gameState.userScore;
  } else if (result === "lose") {
    gameState.compScore++;
    compScoreElement.innerText = gameState.compScore;
  }
};

const game = (choiceId) => {
  if (gameState.gameOver) return;

  const computerChoice = genCompChoice();
  const result = determineWinner(choiceId, computerChoice);

  // Update UI based on result
  if (result === "win") {
    updateMessage(
      `You won! Your ${choiceId} beats ${computerChoice}`,
      "#4CAF50"
    );
    const chosenElement = document.getElementById(choiceId);
    chosenElement.classList.add("winner");
    setTimeout(() => chosenElement.classList.remove("winner"), 500);
  } else if (result === "lose") {
    updateMessage(
      `You lost! Computer's ${computerChoice} beats ${choiceId}`,
      "#f44336"
    );
  } else {
    updateMessage("It's a draw! Try again", "#2196F3");
  }

  updateScore(result);
  gameState.roundsPlayed++;

  checkGameOver();
};

// Event Listeners
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const choiceId = choice.getAttribute("id");
    game(choiceId);
  });
});

resetBtn.addEventListener("click", () => {
  gameState = {
    userScore: 0,
    compScore: 0,
    roundsPlayed: 0,
    gameOver: false,
  };

  userScoreElement.innerText = "0";
  compScoreElement.innerText = "0";
  updateMessage("Start Your Game!!", "#0f1014");
});

classicModeBtn.addEventListener("click", () => {
  gameState.isBestOf3 = false;
  classicModeBtn.classList.add("active");
  bestOf3ModeBtn.classList.remove("active");
  resetBtn.click();
});

bestOf3ModeBtn.addEventListener("click", () => {
  gameState.isBestOf3 = true;
  bestOf3ModeBtn.classList.add("active");
  classicModeBtn.classList.remove("active");
  resetBtn.click();
});
