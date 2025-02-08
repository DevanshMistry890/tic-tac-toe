import React from 'react';
import Cell from './Cell';
import './Board.css'; // Optional: Add specific styles for the board

const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Cell key={index} value={value} onClick={() => onClick(index)} />
      ))}
    </div>
  );
};

export default Board;