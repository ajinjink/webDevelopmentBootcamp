function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="active-winner-name">PLAYER NAME</span>!';
    gameOverElement.style.display = 'none';

    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
            gameBoardItemElement.textContent = '';
            gameBoardItemElement.classList.remove('disabled');
            gameBoardIndex++;
        }
    }

    gameIsOver = false;
}

function startNewGame() {
    if (!players[0].name || !players[1].name) {
        alert('Please set custom player names for both players!');
        return;
    }

    resetGameStatus();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    }
    else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    if (event.target.tagName !== 'LI' || gameIsOver) {
        return;
    }

    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;
    if (gameData[selectedColumn][selectedRow] > 0) {
        alert('Please select an empty field!')
        return;
    }

    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add('disabled');

    gameData[selectedColumn][selectedRow] = activePlayer + 1;

    const winnderId = checkForGameOver();
    if (winnderId) {
        endGame(winnderId);
    }

    currentRound++;
    switchPlayer();
}

function checkForGameOver() {
    for (let i = 0; i < 3; i++) { 
        if (gameData[i][0] == gameData[i][1] && gameData[i][1] == gameData[i][2] && gameData[i][0]) { // 가로로 같은가
            return gameData[i][0];
        }
        if (gameData[0][i] == gameData[1][i] && gameData[1][i] == gameData[2][i] && gameData[0][i]) { // 세로로 같은가
            return gameData[0][i];
        }
    }
    if (gameData[0][0] == gameData[1][1] && gameData[1][1] == gameData[2][2] && gameData[0][0]) {
        return gameData[0][0];
    }
    if (gameData[2][0] == gameData[1][1] && gameData[1][1] == gameData[0][2] && gameData[1][1]) {
        return gameData[1][1];
    }

    if (currentRound === 9) {
        return -1;
    }
    return 0;
}

function endGame(winnderId) {
    gameOverElement.style.display = 'block';

    if (winnderId > 0) {
        gameOverElement.firstElementChild.firstElementChild.textContent = players[winnderId - 1].name;
    }
    else {
        gameOverElement.firstElementChild.textContent = "It\'s a draw!";
    }

    gameIsOver = true;
}