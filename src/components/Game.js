import React from 'react';
import Grid from './Grid';
import NextToPlay from './NextToPlay';
import TimeIndicator from './TimeIndicator';
import Timer from './Timer';

import { uniqueId } from 'underscore';

const WINTIMEOUT = 3000;

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      nextToPlay: 'X',
      endTime: Date.now() + 1000 * 2, //15 seconds
      grid: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      bonusTime: [],
      timeout: false,
      winningLine: [],
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
      bonusTime: [ ...this.state.bonusTime, { id: uniqueId('time-bonus-'), seconds } ],
      endTime: newEndTime
    });
  }

  addToScore(num) {
    const newScore = this.props.score + num;
    this.props.updateScores(newScore);
  }

  handleWin(winningLine) {
    this.setState({
      timeout: true,
      winningLine
    });
    setTimeout(() => {
      this.setState({
        timeout: false,
        winningLine: []
      });
      this.resetGrid();
    }, WINTIMEOUT);
  }

  handleTie() {
    this.addTime(5);
    this.addToScore(1);
    this.resetGrid();
  }

  handleGameOver() {
    this.setState({ timeout: true });
    this.props.changeView('start', 1000);
  }

  handleClick(cell) {
    if (this.state.timeout) return false;

    const newGrid = this.state.grid.slice(0);
    if (newGrid[cell] === ' ') {
        newGrid[cell] = this.state.nextToPlay;
        this.setState({
            grid: newGrid
        });

        const winningLine = this.isGameWon(newGrid);
        if (winningLine) {
            this.handleWin(winningLine);
        } else if (!newGrid.some(cell => cell === ' ')) {
            this.handleTie();
        } else {
            this.toggleSymbol();
        }
    }
  }

  isGameWon(grid) {
    let index = 0;
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

    const gameIsWon =  matches.some((cells, i) => {
        const cellValues = cells.map(n => grid[n]);
        if (cellValues[0] !== ' ' && cellValues[0] === cellValues[1] && cellValues[0] === cellValues[2]) {
          index = i;
          return true;
        }
        return false;
    });

    if (gameIsWon) return matches[index];
    return false;
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

  renderBonusTimes() {
    return this.state.bonusTime.map(s => {
      return (
        <TimeIndicator
          seconds={s.seconds}
          key={s.id} 
          removeBonus={() => this.removeBonus(s.id)}
        />
      )
    });
  }

  removeBonus(id) {
    const newBonusTime = this.state.bonusTime.filter((arr, item) => {
      return item.id === id;
    }, []);

    console.log(newBonusTime);

    this.setState({
      bonusTime: newBonusTime
    });
  }

  render() {
    return (
      <div className="Game">
        <Timer
          onTimeUp={this.handleGameOver.bind(this)}
          endTime={this.state.endTime}
        />
        {this.renderBonusTimes()}
        <Grid 
          grid={this.state.grid}
          toggleSymbol={() => this.toggleSymbol()}
          handleClick={this.handleClick.bind(this)}
          winningLine={this.state.winningLine}
        />
        <NextToPlay symbol={this.state.nextToPlay} />
      </div>
    );
  }
}