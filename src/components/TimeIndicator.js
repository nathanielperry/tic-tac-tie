import React from 'react';

export default class TimeIndicator extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.removeBonus();
        }, 2000)
    }

    render() {
        const s = this.props.seconds;
        return (
            <p className={`time-indicator ${this.props.seconds > 0 ? "time-indicator-plus" : "time-indicator-minus"}`}>
                {`${s > 0 ? '+' : ''}${s}`}
            </p>
        )
    }
}