import React from 'react';

export default class NextToPlay extends React.Component {
    render() {
        return (
            <div className="next-to-play">
                {this.props.symbol}
            </div>
        )
    }
}