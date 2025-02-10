// Function to calculate the best move for the AI
export const getBestMove = (board) => {
    let bestScore = -Infinity;
    let bestMove = null;
  
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O'; // AI is 'O'
        const score = minimax(board, 0, false);
        board[i] = null; // Undo the move
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };
  
  // Minimax algorithm to evaluate the best move
  const minimax = (board, depth, isMaximizing) => {
    const { winner } = calculateWinner(board);
  
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (board.every((cell) => cell !== null)) return 0;
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };
  
  // Helper function to calculate the winner (imported from App.js)
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