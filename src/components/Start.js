import React from 'react';

export default class Start extends React.Component {
    render() {
        return (
            <div className="start popin">
                { this.props.played &&
                    <div className="game-over-section">
                        <h2 className="game-over">Game Over</h2>
                        <h2 className="how-to-header">Tip</h2>
                        <p>Use the numpad to place Xs and Os more quickly.</p>
                    </div>
                }
                <h2 className="how-to-header">How to Play</h2> 
                <p>Tie as many games of Tic Tac Toe as possible in the given time. Each tie adds to your score and gives you more time.</p>
                <button onClick={() => this.props.changeView('game', 4000)}>Start Game</button>
            </div>
        )
    }
}