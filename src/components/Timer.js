import React from 'react';
import * as dfns from 'date-fns';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeRemaining: Math.max(0, this.props.endTime - Date.now()),
        }
    }

    componentDidMount() {
        this.timerId = setInterval(this.tick.bind(this), 10);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    tick() {
        const timeRemaining = Math.max(0, this.props.endTime - Date.now());

        this.setState({
            timeRemaining
        });

        if (timeRemaining <= 0) {
            this.timeUp();
        }
    }

    timeUp() {
        this.props.onTimeUp();
        clearInterval(this.timerId);
    }

    render() {
        return (
            <div className="timer popin">
                <p>
                    {dfns.format(this.state.timeRemaining, `mm:ss:SS`)}
                </p>
            </div>
        )
    }
}