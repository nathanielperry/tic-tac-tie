import React from 'react';
import Game from './components/Game';
import Start from './components/Start';
import End from './components/End';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'start',
            highscore: 0,
            lastScore: 0,
        }
    }

    changeView(newView) {
        this.setState({
            view: newView
        });
    }

    updateScores(score) {
        const highscore = this.state.highscore < score ? score : this.state.highscore;
        this.setState({
            highscore: highscore,
            lastScore: score
        });
    }

    renderView(view) {
        switch (view) {
            case 'start':
                return (
                    <Start 
                        changeView={this.changeView.bind(this)}
                    /> 
                )
            case 'game':
                return (
                    <Game 
                        updateScores={this.updateScores.bind(this)}
                        changeView={this.changeView.bind(this)}
                        score={this.state.lastScore}
                    />
                )
            case 'end':
                return (
                    <End 
                        changeView={this.changeView.bind(this)}
                    />
                )
            default:
                return (
                    <Start 
                        changeView={this.changeView.bind(this)}
                    /> 
                )
        }
    }

    render() {
        return (
            <div className="App">
                <p>Highscore: {this.state.highscore}</p>
                <p>Score: {this.state.lastScore}</p>
                {this.renderView(this.state.view)}
            </div>
        )
    }
}