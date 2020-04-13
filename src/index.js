import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Container, MainText, NextPlayer, Button, Cells } from "./styles";
import GlobalStyle from "./styles/global";

import { FaBackward, FaRedo } from "react-icons/fa";

function Square(props) {
  return (
    <Cells
      onClick={props.onClick}
      value={props.value}
      onMouseOver={props.value}
    >
      {props.value}
    </Cells>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        onMouseOver={() => this.props.onMouseOver(i)}
      />
    );
  }}
  createBoard = () => {
    let board = [];
    let squareValue;

    for (var row = 0; row < 3; row++) {
      let boardRow = [];
      for (var col = 0; col < 3; col++) {
        squareValue = row * 3 + col;
        boardRow.push(this.renderSquare(squareValue));
      }
      board.push(<div className="board-row">{boardRow}</div>);
    }

    return board;
  };

  render() {
    return <div>{this.createBoard()}</div>
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      historyCoord: [
        {
          value: null
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const historyCoord = this.state.historyCoord.slice(
      0,
      this.state.stepNumber + 1
    );
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const coord = i;

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      historyCoord: historyCoord.concat([
        {
          value: i
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      coord: coord
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  returnCoords(i) {
    const coords =
      i === 0
        ? "(1, 1)"
        : i === 1
        ? "(1, 2)"
        : i === 2
        ? "(1, 3)"
        : i === 3
        ? "(2, 1)"
        : i === 4
        ? "(2, 2)"
        : i === 5
        ? "(2, 3)"
        : i === 6
        ? "(2, 1)"
        : i === 7
        ? "(2, 2)"
        : i === 8
        ? "(2, 3)"
        : "";
    return coords;
  }

  render() {
    const history = this.state.history;
    const historyCoord = this.state.historyCoord;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const button = move ? (
        <FaBackward color="#fff" size={14} />
      ) : (
        <FaRedo color="#fff" size={14} />
      );

      const status = move
        ? "Go to move #" +
          move +
          " - Coords: " +
          this.returnCoords(historyCoord[move].value)
        : "Go to game start";

      return (
        <li key={move}>
          <Button
            onClick={() => this.jumpTo(move)}
            current={move === history.length - 1 ? 1 : 0}
          >
            {button}
            {status}
          </Button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = `Next player:`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <MainText>{status}</MainText>
          <NextPlayer value={this.state.xIsNext ? "X" : "O"}>
            {this.state.xIsNext ? "X" : "O"}
          </NextPlayer>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Container>
    <Game />
    <GlobalStyle />
  </Container>,
  document.getElementById("root")
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
