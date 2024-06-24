import React, { useState, useEffect } from 'react';

const TicTacToe3D = () => {
  const [board, setBoard] = useState(Array(27).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState('human'); // 'human' or 'computer'

 const calculateWinner = (squares) => {
    const lines = [
      // Horizontal lines
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [9, 10, 11], [12, 13, 14], [15, 16, 17],
      [18, 19, 20], [21, 22, 23], [24, 25, 26],
      // Vertical lines
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [9, 12, 15], [10, 13, 16], [11, 14, 17],
      [18, 21, 24], [19, 22, 25], [20, 23, 26],
      // Depth lines
      [0, 9, 18], [1, 10, 19], [2, 11, 20],
      [3, 12, 21], [4, 13, 22], [5, 14, 23],
      [6, 15, 24], [7, 16, 25], [8, 17, 26],
      // Diagonals
      [0, 4, 8], [2, 4, 6], [18, 22, 26], [20, 22, 24],
      [0, 13, 26], [2, 13, 24], [6, 13, 20], [8, 13, 18],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getEmptySquares = (squares) => {
    return squares.reduce((acc, val, idx) => {
      if (val === null) acc.push(idx);
      return acc;
    }, []);
  };

  const makeComputerMove = (squares) => {
    const emptySquares = getEmptySquares(squares);
    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      return emptySquares[randomIndex];
    }
    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(board) || board[i] || (gameMode === 'computer' && !xIsNext)) {
      return;
    }
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  useEffect(() => {
    if (gameMode === 'computer' && !xIsNext && !calculateWinner(board)) {
      const timer = setTimeout(() => {
        const computerMove = makeComputerMove(board);
        if (computerMove !== null) {
          const newBoard = [...board];
          newBoard[computerMove] = 'O';
          setBoard(newBoard);
          setXIsNext(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [board, xIsNext, gameMode]);

  const renderSquare = (i) => {
    return (
      <button
        className="w-12 h-12 text-2xl font-bold border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white"
        onClick={() => handleClick(i)}
        disabled={gameMode === 'computer' && !xIsNext}
      >
        {board[i]}
      </button>
    );
  };

  const renderLayer = (start) => {
    return (
      <div className="grid grid-cols-3 gap-1 mb-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => renderSquare(start + i))}
      </div>
    );
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const resetGame = () => {
    setBoard(Array(27).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
    <h1 className="text-4xl font-bold mb-8">3D Tic-Tac-Toe</h1>
    <div className="mb-4">
      <button
        className={`px-4 py-2 mr-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          gameMode === 'human' ? 'bg-blue-500' : 'bg-gray-600'
        }`}
        onClick={() => {
          setGameMode('human');
          resetGame();
        }}
      >
        Human vs Human
      </button>
      <button
        className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          gameMode === 'computer' ? 'bg-blue-500' : 'bg-gray-600'
        }`}
        onClick={() => {
          setGameMode('computer');
          resetGame();
        }}
      >
      
          Human vs Computer
        </button>
      </div>
      <div className="mb-4 text-xl font-semibold">{status}</div>
      <div className="mb-8">
        {renderLayer(0)}
        {renderLayer(9)}
        {renderLayer(18)}
      </div>
      <button
        className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe3D;
