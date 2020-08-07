import React from 'react';
import 'normalize.css';
import './App.css';
import Game from './components/Game';
import Start from './components/Start';

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
                    <Start 
                        changeView={this.changeView.bind(this)}
                        played={true}
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
                <header className="app-header">
                    <h1 className="app-title"><a href="/">Tic Tac Tie</a></h1>
                </header>
                <div className="app-body">
                    <div className="score-bar">
                        <p className="score-bar__highscore">Highscore: {this.state.highscore}</p>
                        <p className="score-bar__score">Score: {this.state.lastScore}</p>
                    </div>
                    <div className="main-view">
                        {this.renderView(this.state.view)}
                    </div>
                </div>
            </div>
        )
    }
}