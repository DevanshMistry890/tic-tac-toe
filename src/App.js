import React, { useState } from 'react';
import Board from './components/Board';
import { getBestMove } from './agent';

const App = () => {
  // State to track the board and current player
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isAIMode, setIsAIMode] = useState(false); // Track AI mode

  // Function to check the winner
  const winner = calculateWinner(board);

  // handle click
  const handleClick = (index) => {
    if (board[index] || winner) return;

    // Create a new board with the player's move
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // If in AI mode; make the AI move
    if (isAIMode) {
      setTimeout(() => { 
      const aiMove = getBestMove(newBoard);
      if (aiMove !== null) {
        const updatedBoard = [...newBoard];
        updatedBoard[aiMove] = 'O';
        setBoard(updatedBoard);
        setIsXNext(true);
      }
    }, 300); // Delay for AI's turn
    }
  };

  // Reset Game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  // Toggle AI mode
  const toggleAIMode = () => {
    setIsAIMode(!isAIMode);
    resetGame();
  };

  // show game status
  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every((cell) => cell !== null)) {
      return 'Draw!';
    } else {
      return `Turn of Player: ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="status">{getStatus()}</div>
      <Board board={board} onClick={handleClick} />
      <div className='btn-bar'>
        <button className="reset-button" onClick={resetGame}>
          <span className="fas fa-sync mr-icon"></span>Reset Game
        </button>
        <button className="reset-button" onClick={toggleAIMode}>
          {isAIMode ? 'Switch to 2 Player' : <><i className="fas fa-robot mr-icon"></i>Play Against AI</>}
        </button>
      </div>
    </div>
  );
};

// winning situations
const calculateWinner = (board) => {
  const winningLines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  // loop to go through all case
  for (let line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default App;