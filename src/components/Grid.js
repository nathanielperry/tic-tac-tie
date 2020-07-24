import React from 'react';

export default class Grid extends React.Component {
    componentWillMount() {
        //Add keyboard controls
        window.addEventListener('keydown', this.handleKeyPress.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(e) {
        e.preventDefault();
        const keyCodes = {
            103: 0, 104: 1, 105: 2,
            100: 3, 101: 4, 102: 5, 
            97:  6, 98:  7, 99:  8,
        }

        const cellNum = keyCodes[e.keyCode];
        if (Number.isInteger(cellNum)) {
            this.props.handleClick(cellNum);
        }
    }

    renderRow(n) {
        return (
            <tr>
                {this.props.grid.slice(n*3, n*3+3).map((cell, i) => <td onClick={(e) => this.props.handleClick(n*3+i)}>{cell}</td>)}
            </tr>
        );
    }

    renderTable() {
        return [
            this.renderRow(0),
            this.renderRow(1),
            this.renderRow(2),
        ];
    }

    //TODO: Add keys to repeated elements
    render() {
        return (
            <div className="grid-container">
                <table className="grid">
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}