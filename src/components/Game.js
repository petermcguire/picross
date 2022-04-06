import React from 'react';
import Board from "./Board";


class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='centered'>
                Click to guess filled.
                <br />
                Hold CMD and click to guess empty.
                <Board dim={this.props.dim} />
                Mistakes: {this.mistakes}
                <br />
                {this.done}
            </div>
        )
    }
}

export default Game;