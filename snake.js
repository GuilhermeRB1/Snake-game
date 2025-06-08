const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn'); 
const resetBtn = document.getElementById('reset-btn'); 

let snake = [];
let food = {};
let score = 0;
let gameRunning = false;
let gameInterval;
let gameSpeed = 200;
let currentDirection;
const directions = {
    UP: { x: 0, y: -10 },
    DOWN: { x: 0, y: 10 },
    LEFT: { x: -10, y: 0 },
    RIGHT: { x: 10, y: 0 },
};

// Função para inicializar o jogo
function initGame() {
    snake = [{ x: 200, y: 200 }];
    food = generateFood();
    score = 0;
    currentDirection = directions.RIGHT;
    drawGame();
}

// Função para desenhar o jogo
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    document.getElementById('score').textContent = `Pontuação: ${score}`;
}

// Função para desenhar a cobra
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
}

// Função para desenhar a comida
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Função para gerar comida em uma posição aleatória
function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    const y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
    return { x, y };
}

// Função para atualizar o jogo
function updateGame() {
    const head = { x: snake[0].x + currentDirection.x, y: snake[0].y + currentDirection.y };

    if (checkCollision(head)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = generateFood();
    } else {
        snake.pop();
    }

    drawGame();
}

// Função para verificar colisões
function checkCollision(head) {
    if (
        head.x < 0 || 
        head.y < 0 || 
        head.x >= canvas.width || 
        head.y >= canvas.height
    ) {
        return true;
    }
    
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    
    return false;
}

// Função para encerrar o jogo
function gameOver() {
    gameRunning = false;
    clearInterval(gameInterval);
    alert(`Game Over! Sua pontuação: ${score}`);
}

// Função para iniciar o jogo
function startGame() {
    if (gameRunning) return;
    
    initGame();
    gameRunning = true;
    gameInterval = setInterval(updateGame, gameSpeed);
}

// Função para reiniciar o jogo
function resetGame() {
    clearInterval(gameInterval);
    gameRunning = false;
    initGame();
}

startBtn.addEventListener('click', () => {
    startGame();
    startBtn.blur(); 
});

resetBtn.addEventListener('click', () => {
    resetGame();
    resetBtn.blur(); 
});


document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    switch (e.key) {
        case 'ArrowUp':
            if (currentDirection !== directions.DOWN) {
                currentDirection = directions.UP;
            }
            break;
        case 'ArrowDown':
            if (currentDirection !== directions.UP) {
                currentDirection = directions.DOWN;
            }
            break;
        case 'ArrowLeft':
            if (currentDirection !== directions.RIGHT) {
                currentDirection = directions.LEFT;
            }
            break;
        case 'ArrowRight':
            if (currentDirection !== directions.LEFT) {
                currentDirection = directions.RIGHT;
            }
            break;
    }
});