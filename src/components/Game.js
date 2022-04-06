import React from 'react';
import Board from "./Board";


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mistakes: 0,
            done: 'Playing...'
        };
    }

    updateGameInfo = (info) => {
        this.setState({
            mistakes: info.mistakes,
            done: info.done
        });
    }

    render() {
        return (
            <div className='centered'>
                Dimension is {this.props.dim}
                <br />
                Click to guess filled.
                <br />
                Hold CMD and click to guess empty.
                <Board
                    dim={this.props.dim}
                    updateGameInfo={this.updateGameInfo}
                />
                Mistakes: {this.state.mistakes}
                <br />
                {this.state.done}
            </div>
        )
    }
}

export default Game;