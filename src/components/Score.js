import React from 'react';

export default class Score extends React.Component {
    render() {
        return (
            <div className="score">
                <p>{this.props.score}</p>
            </div>
        )
    }
}