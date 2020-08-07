import React from 'react';
import Grid from './Grid';
import NextToPlay from './NextToPlay';
import Timer from './Timer';

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      nextToPlay: 'X',
      endTime: Date.now() + 1000 * 15, //15 seconds 
      grid: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
    }

    this.props.updateScores(0);
  }

  toggleSymbol() {
    const newSymbol = this.state.nextToPlay === 'X' ? 'O' : 'X';
    this.setState({
        nextToPlay: newSymbol
    });
  }

  addTime(seconds) {
    const newEndTime = this.state.endTime + seconds * 1000;
    this.setState({
      endTime: newEndTime
    });
  }

  addToScore(num) {
    const newScore = this.props.score + num;
    this.props.updateScores(newScore);
  }

  handleWin() {
    this.addTime(-5);
    this.resetGrid();
  }

  handleTie() {
    this.addTime(5);
    this.addToScore(1);
    this.resetGrid();
  }

  handleClick(cell) {
    const newGrid = this.state.grid.slice(0);
    if (newGrid[cell] === ' ') {
        newGrid[cell] = this.state.nextToPlay;
        this.setState({
            grid: newGrid
        });
        if (this.isGameWon(newGrid)) {
            this.handleWin();
        } else if (!newGrid.some(cell => cell === ' ')) {
            this.handleTie();
        } else {
            this.toggleSymbol();
        }
    }
  }

  isGameWon(grid) {
    const matches = [
        //horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        //vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //diagonal
        [0, 4, 8],
        [2, 4, 6],
    ];

    return matches.some(cells => {
        const cellValues = cells.map(n => grid[n]); 
        return cellValues[0] !== ' ' && cellValues[0] === cellValues[1] && cellValues[0] === cellValues[2];
    });
  }

  resetGrid() {
    if (this.props.nextToPlay === 'O') this.props.toggleSymbol();

    const newGrid = this.getSeededGrid(this.props.score);

    this.setState({
        grid: newGrid
    });
  }

  getSeededGrid(n) {
    //Seeds grid with Xs and Os, to a maximum of 3.
    const newGrid = [
      ' ', ' ', ' ',
      ' ', ' ', ' ',
      ' ', ' ', ' '
    ]

    const numToSeed = Math.max(0, Math.min(3, n - 3));
    const symbolsToSeed = Array.from(
      { length: numToSeed },
      (_, i) => {
        return {
          symbol: i % 2 === 0 ? 'X' : 'O',
          position: Math.floor(Math.random() * 8), 
        }
      }
    )

    symbolsToSeed.forEach(seed => {
      newGrid[seed.position] = seed.symbol;
    });

    return newGrid;
  }

  render() {
    return (
      <div className="Game">
        <Timer
          onTimeUp={() => this.props.changeView('end')}
          endTime={this.state.endTime}
        />
        <Grid 
          grid={this.state.grid}
          toggleSymbol={() => this.toggleSymbol()}
          handleClick={this.handleClick.bind(this)}
        />
        <NextToPlay symbol={this.state.nextToPlay} />
      </div>
    );
  }
}