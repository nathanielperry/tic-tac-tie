import React from 'react';

export default class Start extends React.Component {
    render() {
        return (
            <div className="start">
                <h2 class="how-to-header">How to Play</h2> 
                <p>Tie as many games of Tic Tac Toe as possible. Each tie adds to your score and gives you more time.</p>
                <button onClick={() => this.props.changeView('game')}>Start Game</button>
            </div>
        )
    }
}