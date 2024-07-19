import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";

import { update as updateFood, draw as drawFood, getCollectedCount } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

function main(currentTime) {
  if (gameOver) {
    // Show the popup
    const popup = document.getElementById("popup");
    const collectedCountElement = document.getElementById("collected-count");
    
    collectedCountElement.textContent = getCollectedCount(); // Update collected count
    popup.style.display = "flex"; // Show the popup

    // Handle restart button click
    document.getElementById("restart-button").addEventListener("click", () => {
      window.location.reload(); // Reload the page to restart
    });

    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();

}


function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}


function clearBoard() {
  // Verify no unintended style changes
  const elements = gameBoard.getElementsByClassName('snake');
  while (elements[0]) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  const foodElements = gameBoard.getElementsByClassName('food');
  while (foodElements[0]) {
    foodElements[0].parentNode.removeChild(foodElements[0]);
  }
  // Check for other unintended modifications
}


function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
