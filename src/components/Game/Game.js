import React from 'react';
import Board from "../Board/Board";
import { useParams } from 'react-router-dom';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

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
        console.log(this.props);
        var _dim = parseInt(this.props.params.dim);
        return (
            <div>
                Dimension is {_dim}
                <br />
                Click to guess filled.
                <br />
                Hold CMD and click to guess empty.
                <Board
                    dim={_dim}
                    updateGameInfo={this.updateGameInfo}
                />
                Mistakes: {this.state.mistakes}
                <br />
                {this.state.done}
            </div>
        )
    }
}

export default withParams(Game);