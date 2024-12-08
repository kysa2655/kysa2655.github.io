const bird = document.getElementById('bird');
const topPipe = document.getElementById('top-pipe');
const bottomPipe = document.getElementById('bottom-pipe');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level'); 
const highScoreDisplay = document.getElementById('high-score');
const highScoreContainer = document.getElementById('high-score-container');
const gameContainer = document.querySelector('.game-container');
const popupMessageContainer = document.getElementById('popup-message-container');
const popupButtonContainer = document.getElementById('popup-button-container');
const popupMessage = document.getElementById('popup-message');
const startButton = document.getElementById('start-button');
const resetLevelOneButton = document.getElementById('reset-level-one-button'); 

let birdTop = 200;
let gravity = 3; 
let isJumping = false;
let score = 0;
let highScore = 0; 
let hasPassedPipe = false; 
let firstPipeInitialized = false; 
let isGameRunning = false;
let isGamePaused = false; 
let currentLevel = 1;
let gameSpeed = 20;
let gameLoop;


const levels = [
  { targetScore: 5, message: "Level one: 5 points needed", passedMessage: "Level one passed! Level two: 15 points needed" },
  { targetScore: 15, message: "Level two: 15 points needed", passedMessage: "Level two passed! Level three: 25 points needed" },
  { targetScore: 25, message: "Level three: 25 points needed", passedMessage: "Game won! Infinity awaits you" },
  { targetScore: Infinity, message: "Infinity awaits you", passedMessage: null },
];


function showPopup(message, showButton = true) {
  popupMessage.textContent = message;
  popupMessageContainer.style.display = "flex";
  popupButtonContainer.style.display = showButton ? "flex" : "none";
}


function hidePopup() {
  popupMessageContainer.style.display = "none";
  popupButtonContainer.style.display = "none";
}


function resetPipes() {
  topPipe.style.left = `${gameContainer.offsetWidth}px`;
  bottomPipe.style.left = `${gameContainer.offsetWidth}px`;

  topPipe.style.height = "0px";
  bottomPipe.style.height = "0px";

  hasPassedPipe = false;
  firstPipeInitialized = false;
}


function reinitializePipes() {
  const gap = 150; 
  const pipeHeight = Math.random() * 200 + 50;

  topPipe.style.height = `${pipeHeight}px`;
  bottomPipe.style.height = `${gameContainer.offsetHeight - pipeHeight - gap}px`;

  topPipe.style.left = `${gameContainer.offsetWidth}px`;
  bottomPipe.style.left = `${gameContainer.offsetWidth}px`;

  hasPassedPipe = false;
  firstPipeInitialized = true;
}


function resetGameForCurrentLevel() {
  birdTop = 200;
  bird.style.top = `${birdTop}px`;

  resetPipes(); 
  score = 0; 
  updateScoreDisplay();
}


function resetToLevelOne() {
  currentLevel = 1; 
  gravity = 2; 
  gameSpeed = 20; 
  resetGameForCurrentLevel(); 
  levelDisplay.textContent = `Level: ${currentLevel}`; 
  isGamePaused = false; 
  isGameRunning = false; 
  showPopup(levels[0].message); 
}


function updateScoreDisplay() {
  scoreDisplay.textContent = `Score: ${score}`;

  
  if (score > highScore) {
    highScore = score;
    highScoreDisplay.textContent = highScore;
  }
}


function startGame() {
  if (!isGameRunning) {
    resetGameForCurrentLevel();
  }

  isGameRunning = true;

 
  highScoreContainer.style.display = "block";

  hidePopup();
  startGameLoop();
}


function togglePauseGame() {
  if (!isGameRunning) return;

  isGamePaused = !isGamePaused;

  if (isGamePaused) {
    clearInterval(gameLoop);
    showPopup("Game Paused. Press F to Resume.", false);
  } else {
    hidePopup();
    startGameLoop();
  }
}


function moveBird() {
  if (!isGameRunning || isGamePaused) return;

  if (!isJumping) {
    birdTop += gravity;
  } else {
    birdTop -= gravity * 3; 
  }

  bird.style.top = `${birdTop}px`;

  if (birdTop >= gameContainer.offsetHeight - bird.offsetHeight || birdTop <= 0) {
    endGame();
  }
}


function movePipes() {
  if (!isGameRunning || isGamePaused) return;

  const pipeLeft = topPipe.offsetLeft - 3;
  if (pipeLeft < -topPipe.offsetWidth) {
    reinitializePipes();
  } else {
    topPipe.style.left = `${pipeLeft}px`;
    bottomPipe.style.left = `${pipeLeft}px`;
  }
}


function checkPass() {
  if (!isGameRunning || !firstPipeInitialized || isGamePaused) return;

  const pipeLeft = topPipe.offsetLeft;
  const birdRight = bird.offsetLeft + bird.offsetWidth;

  if (!hasPassedPipe && birdRight > pipeLeft + topPipe.offsetWidth) {
    hasPassedPipe = true;
    score++;
    updateScoreDisplay();
    checkLevelProgress();
  }
}


function checkLevelProgress() {
  const levelConfig = levels[currentLevel - 1];
  if (score >= levelConfig.targetScore) {
    isGameRunning = false;
    clearInterval(gameLoop);

    if (currentLevel < levels.length) {
      currentLevel++;
      gravity *= 1.15;
      gameSpeed = gameSpeed * 0.85;

      resetGameForCurrentLevel();
      resetPipes();
      reinitializePipes();
      levelDisplay.textContent = `Level: ${currentLevel}`; 
      showPopup(levelConfig.passedMessage);
    } else {
      levelDisplay.textContent = `Level: Infinity`; 
      showPopup("Infinity mode! Play until you die.", false);
    }
  }
}


document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    isJumping = true;
  }
  if (e.code === 'KeyF') {
    togglePauseGame();
  }
});

document.addEventListener('keyup', (e) => {
  if (e.code === 'Space') {
    isJumping = false;
  }
});


function startGameLoop() {
  clearInterval(gameLoop);
  gameLoop = setInterval(() => {
    moveBird();
    movePipes();
    checkCollision();
    checkPass();
  }, gameSpeed);
}


function checkCollision() {
  if (!isGameRunning || isGamePaused) return;

  const birdRect = bird.getBoundingClientRect();
  const topPipeRect = topPipe.getBoundingClientRect();
  const bottomPipeRect = bottomPipe.getBoundingClientRect();

  if (
    birdRect.right > topPipeRect.left &&
    birdRect.left < topPipeRect.right &&
    birdRect.bottom > topPipeRect.top &&
    birdRect.top < topPipeRect.bottom
  ) {
    endGame();
  }

  if (
    birdRect.right > bottomPipeRect.left &&
    birdRect.left < bottomPipeRect.right &&
    birdRect.bottom > bottomPipeRect.top &&
    birdRect.top < bottomPipeRect.bottom
  ) {
    endGame();
  }
}


function endGame() {
  clearInterval(gameLoop);
  isGameRunning = false;
  showPopup(`You died on level ${currentLevel}. Try again!`);
}


document.addEventListener("DOMContentLoaded", () => {
  showPopup(levels[0].message);
});


startButton.addEventListener("click", startGame);
resetLevelOneButton.addEventListener("click", resetToLevelOne);