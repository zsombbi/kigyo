document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const gameWidth = 400;
    const gameHeight = 400;
    const blockSize = 20;
    const widthInBlocks = gameWidth / blockSize;
    const heightInBlocks = gameHeight / blockSize;
    const ctx = gameBoard.getContext('2d');
  
    let snake = [
      { x: 6, y: 4 },
      { x: 5, y: 4 },
      { x: 4, y: 4 }
    ];
    let food = { x: 10, y: 10 };
    let direction = 'right';
    let intervalId;
    let gameOver = false;
    let score = 0;
  
    function drawBlock(x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    }
  
    function drawSnake() {
      snake.forEach((segment, index) => {
        const snakeColor = index === 0 ? 'blue' : 'darkblue';
        drawBlock(segment.x, segment.y, snakeColor);
      });
    }
  
    function drawFood() {
      drawBlock(food.x, food.y, 'red');
    }
  
    function moveSnake() {
      if (gameOver) return;
  
      const head = { x: snake[0].x, y: snake[0].y };
  
      switch (direction) {
        case 'up':
          head.y--;
          break;
        case 'down':
          head.y++;
          break;
        case 'left':
          head.x--;
          break;
        case 'right':
          head.x++;
          break;
      }
  
      if (isGameOver(head)) {
        gameOver = true;
        showGameOverMessage();
        showRestartButton();
        return;
      }
  
      snake.unshift(head);
  
      if (head.x === food.x && head.y === food.y) {
        score++;
        updateScore();
        generateFood();
      } else {
        snake.pop();
      }
    }
  
    function isGameOver(head) {
      return (
        head.x < 0 ||
        head.x >= widthInBlocks ||
        head.y < 0 ||
        head.y >= heightInBlocks ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
      );
    }
  
    function showGameOverMessage() {
      const gameOverElement = document.getElementById('game-over');
      gameOverElement.textContent = 'A játéknak vége! Pontszám: ' + score;
      gameOverElement.classList.remove('hidden');
    }
  
    function showRestartButton() {
      const restartButton = document.getElementById('restart-button');
      restartButton.classList.remove('hidden');
      restartButton.addEventListener('click', restartGame);
    }
  
    function updateScore() {
      const scoreElement = document.getElementById('score');
      scoreElement.textContent = score;
    }
  
    function generateFood() {
      const maxX = widthInBlocks - 1;
      const maxY = heightInBlocks - 1;
  
      let newFood;
      do {
        newFood = {
          x: Math.floor(Math.random() * maxX) + 1,
          y: Math.floor(Math.random() * maxY) + 1
        };
      } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  
      food = newFood;
    }
  
    function drawGame() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, gameWidth, gameHeight);
      drawSnake();
      drawFood();
    }
  
    function startGame() {
      intervalId = setInterval(() => {
        moveSnake();
        drawGame();
      }, 200);
    }
  
    function restartGame() {
      snake = [
        { x: 6, y: 4 },
        { x: 5, y: 4 },
        { x: 4, y: 4 }
      ];
      direction = 'right';
      gameOver = false;
      score = 0;
      updateScore();
      generateFood();
      const gameOverElement = document.getElementById('game-over');
      gameOverElement.classList.add('hidden');
      const restartButton = document.getElementById('restart-button');
      restartButton.classList.add('hidden');
      restartButton.removeEventListener('click', restartGame);
      startGame();
    }
  
    function changeDirection(event) {
      const keys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
      };
  
      if (event.keyCode in keys) {
        const newDirection = keys[event.keyCode];
        if (isOppositeDirection(newDirection)) {
          return;
        }
        direction = newDirection;
      }
    }
  
    function isOppositeDirection(newDirection) {
      return (
        (direction === 'up' && newDirection === 'down') ||
        (direction === 'down' && newDirection === 'up') ||
        (direction === 'left' && newDirection === 'right') ||
        (direction === 'right' && newDirection === 'left')
      );
    }
  
    document.addEventListener('keydown', changeDirection);
    startGame();
  });
  document.addEventListener('DOMContentLoaded', () => {
    // ... (az előző kód itt helyezkedik el)
  
    function restartGame() {
      snake = [
        { x: 6, y: 4 },
        { x: 5, y: 4 },
        { x: 4, y: 4 }
      ];
      direction = 'right';
      gameOver = false;
      score = 0;
      updateScore();
      generateFood();
      const gameOverElement = document.getElementById('game-over');
      gameOverElement.classList.add('hidden');
      const restartButton = document.getElementById('restart-button');
      restartButton.classList.add('hidden');
      restartButton.removeEventListener('click', restartGame);
      startGame();
    }
  
    function updateScore() {
      const scoreElement = document.getElementById('score');
      scoreElement.textContent = score;
    }
  
    function generateFood() {
      const maxX = widthInBlocks - 1;
      const maxY = heightInBlocks - 1;
  
      let newFood;
      do {
        newFood = {
          x: Math.floor(Math.random() * maxX) + 1,
          y: Math.floor(Math.random() * maxY) + 1
        };
      } while (
        snake.some(segment => segment.x === newFood.x && segment.y === newFood.y) ||
        (newFood.x === food.x && newFood.y === food.y)
      );
  
      food = newFood;
    }
  
    // ... (a többi kód itt helyezkedik el)
  
    startGame();
  });
  