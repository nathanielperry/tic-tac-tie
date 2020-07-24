import React from 'react';

export default class Start extends React.Component {
    render() {
        return (
            <div className="start">
                <p>Tie as many games of Tic Tac Toe as possible. Each tie gives you more time.</p>
                <button onClick={() => this.props.changeView('game')}>Start Game</button>
            </div>
        )
    }
}