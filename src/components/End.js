import React from 'react';

export default class End extends React.Component {
    render() {
        return (
            <div className="end">
                <button onClick={() => this.props.changeView('start')}>Title</button>
                <button onClick={() => this.props.changeView('game')}>Play Again</button>
            </div>  
        )
    }
}