const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');

const canvasSize = 400;
const scale = 10;
const snakeColor = '#000000';
const foodColor = '#FFFFFF';
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake;
let food;
let score;
let direction;
let gameInterval;

// Función para inicializar el juego
function initGame() {
    snake = [{ x: canvasSize / 2, y: canvasSize / 2 }];
    food = createFood();
    score = 0;
    direction = null;
    scoreDisplay.textContent = 'Puntuación: ' + score;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

// Función para crear comida aleatoria
function createFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / scale)) * scale,
        y: Math.floor(Math.random() * (canvasSize / scale)) * scale
    };
}

// Función principal del bucle de juego
function gameLoop() {
    if (direction) {
        moveSnake();
        if (isGameOver()) {
            alert('¡Juego Terminado!');
            clearInterval(gameInterval);
            return;
        }
        if (eatFood()) {
            score++;
            scoreDisplay.textContent = 'Puntuación: ' + score;
            food = createFood();
        }
        drawGame();
    }
}

// Función para mover la serpiente
function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    if (direction === 'left') head.x -= scale;
    if (direction === 'up') head.y -= scale;
    if (direction === 'right') head.x += scale;
    if (direction === 'down') head.y += scale;

    snake.unshift(head);
    snake.pop();
}

// Función para verificar si la serpiente come la comida
function eatFood() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        snake.push({});
        return true;
    }
    return false;
}

// Función para dibujar el juego
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = snakeColor;
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, scale, scale));
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x, food.y, scale, scale);
}

// Función para verificar si el juego ha terminado
function isGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Event listener para cambiar la dirección de la serpiente
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
    if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
});

// Event listener para el botón de comenzar/reiniciar
startButton.addEventListener('click', initGame);

// Inicializar el juego al cargar la página
window.onload = initGame;
