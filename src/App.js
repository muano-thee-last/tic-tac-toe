import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick, winner }) {
  function handleClick() {
    if (winner || value) {
      console.log(
        winner ? `Game Over, player ${winner} won` : "Already Filled"
      );
      return;
    }
    onSquareClick();
  }

  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

function Board() {
  const [boardState, setBoardState] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null))
  );
  const [xIsNext, setXisNext] = useState(true);
  const [moveHistory, setMoveHistory] = useState([]);

  function isWinState() {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        boardState[i][0] === boardState[i][1] &&
        boardState[i][1] === boardState[i][2] &&
        boardState[i][0] !== null
      ) {
        return boardState[i][0];
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        boardState[0][i] === boardState[1][i] &&
        boardState[1][i] === boardState[2][i] &&
        boardState[0][i] !== null
      ) {
        return boardState[0][i];
      }
    }
    // Check diagonals
    if (
      boardState[0][0] === boardState[1][1] &&
      boardState[1][1] === boardState[2][2] &&
      boardState[0][0] !== null
    ) {
      return boardState[0][0];
    }
    if (
      boardState[0][2] === boardState[1][1] &&
      boardState[1][1] === boardState[2][0] &&
      boardState[0][2] !== null
    ) {
      return boardState[0][2];
    }
    return null;
  }

  const winner = isWinState();

  function handleSquareClick(row, col) {
    if (boardState[row][col] || winner) return;

    const newBoardState = boardState.map((r, i) =>
      r.map((cell, j) =>
        i === row && j === col ? (xIsNext ? "X" : "O") : cell
      )
    );
    setBoardState(newBoardState);

    // Add move to history
    const currentPlayer = xIsNext ? "X" : "O";
    setMoveHistory([...moveHistory, { player: currentPlayer, row, col }]);

    setXisNext(!xIsNext);
  }

  const board = boardState.map((row, rowIndex) => (
    <div className="board-row" key={rowIndex}>
      {row.map((value, colIndex) => (
        <Square
          key={`${rowIndex}-${colIndex}`}
          value={value}
          onSquareClick={() => handleSquareClick(rowIndex, colIndex)}
          winner={winner}
        />
      ))}
    </div>
  ));

  return (
    <div className="game-container">
      <div className="board-container">
        <div className="status">
          {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`}
        </div>
        <div className="board">{board}</div>
      </div>
      <div className="move-history">
        <h3>Move History</h3>
        <ul>
          {moveHistory.map((move, index) => (
            <li key={index}>
              Player {move.player} moved to ({move.row + 1}, {move.col + 1})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  return <Board />;
}

export default App;
