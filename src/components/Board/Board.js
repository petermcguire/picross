import React from 'react';
import Square from '../Square/Square'
import Clue from '../Clue/Clue';
import './Board.css'

class Board extends React.Component {
    constructor(props) {
        super(props);
        // set up grid dimensions
        document.documentElement.style.setProperty('--colNum', props.dim + 1);
        this.gridSize = props.dim * props.dim;
        this.state = {
            squareStates: Array(this.gridSize).fill(0)
        };
        this.binaryGrid = Array.from({ length: this.gridSize }, () => Math.floor(Math.random() * 2));
        this.existCount = 0;
        this.binaryGrid.forEach(binary => {
            this.existCount += binary;
        });
        this.existGuessCount = 0;
        this.done = 'Playing...';
        this.mistakes = 0;
    }

    getColumn = (start) => {
        const result = [];

        for (let i = start; i < this.binaryGrid.length; i += this.props.dim) {
            result.push(this.binaryGrid[i]);
        }

        return result;
    }

    handleClick = (e, i) => {
        const squareStates = [...this.state.squareStates];
        // don't do anything if already guessed
        if (squareStates[i] != 0) {
            return;
        }
        // check guess against binary grid
        if (e.metaKey) {
            // guess is empty
            if (this.binaryGrid[i] === 0) {
                // correct guess: empty
                squareStates[i] = 1;
            } else {
                // incorrect guess: empty
                squareStates[i] = 3;
                this.mistakes++;
            }
        } else {
            // guess is filled
            if (this.binaryGrid[i] === 1) {
                // correct guess: filled
                squareStates[i] = 2;
                // update count of correct guessed exists
                this.existGuessCount += 1;
            } else {
                // incorrect guess: filled
                squareStates[i] = 4;
                this.mistakes++;
            }
        }
        this.setState({ squareStates });
        // check if we're done
        if (this.existGuessCount === this.existCount) {
            this.done = 'DONE!!!!'
        }
        var info = {
            mistakes: this.mistakes,
            done: this.done
        }
        // update game info
        this.props.updateGameInfo(info); 
    }

    render() {
        return (
            <div className="grid-container">
                <div></div>
                {
                    React.Children.toArray(
                        [...Array(this.props.dim).keys()].map((x) =>
                            <Clue
                                col={this.getColumn(x)}
                                style={'grid-item-top-clue'}
                            />
                        )
                    )
                }
                {
                    React.Children.toArray(
                        [...Array(this.gridSize).keys()].map(
                            (x) => {
                                if (x % this.props.dim === 0) {
                                    return (
                                        <>
                                            <Clue
                                                col={this.binaryGrid.slice(x, x + this.props.dim)}
                                                style={'grid-item-left-clue'}
                                            />
                                            <Square
                                                style={this.state.squareStates[x]}
                                                onClick={(e) => this.handleClick(e, x)}
                                            />
                                        </>
                                    )
                                } else {
                                    return (
                                        <Square
                                            style={this.state.squareStates[x]}
                                            onClick={(e) => this.handleClick(e, x)}
                                        />
                                    )
                                }
                            }
                        )
                    )
                }
            </div>
        )
    }
}

export default Board;