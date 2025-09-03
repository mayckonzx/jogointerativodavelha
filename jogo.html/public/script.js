const boardEl = document.getElementById('board');
const currentPlayerEl = document.getElementById('currentPlayer');
const resultEl = document.getElementById('result');
const resetBtn = document.getElementById('resetBtn');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
  [0, 4, 8], [2, 4, 6]             // diagonais
];

function renderBoard() {
  boardEl.innerHTML = '';
  board.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (value) cell.classList.add(value);
    cell.textContent = value;
    cell.dataset.index = index;
    cell.addEventListener('click', handleMove);
    boardEl.appendChild(cell);
  });
}

function handleMove(e) {
  const index = e.target.dataset.index;

  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWinner(currentPlayer)) {
    resultEl.textContent = `🏆 Jogador ${currentPlayer} venceu!`;
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    resultEl.textContent = '🤝 Empate!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerEl.textContent = currentPlayer;
}

function checkWinner(player) {
  return winPatterns.some(pattern => 
    pattern.every(index => board[index] === player)
  );
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  resultEl.textContent = '';
  currentPlayerEl.textContent = currentPlayer;
  renderBoard();
}

resetBtn.addEventListener('click', resetGame);

// Inicialização
renderBoard();
