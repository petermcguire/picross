import React from 'react';
import './Clue.css'

class Clue extends React.Component {
    constructor(props) {
        super(props);
    }

    makeClue = (binaryLine) => {
        const clue = [];
        var run = 0;

        // find runs and add
        binaryLine.forEach(binary => {
            if (binary === 1) {
                run += 1;
            } else {
                if (run > 0) {
                    clue.push(
                        <div className='clue'>{run}</div>
                    );
                    run = 0;
                }
            }
        })

        // account for hanging run, if exists
        if (run > 0) {
            clue.push(
                <div className='clue'>{run}</div>
            );
        }

        // if no clues, add 0
        if (clue.length === 0) {
            clue.push(
                <div className='clue'>{0}</div>
            );
        }

        return clue;
    }

    render() {
        return (
            <div className={this.props.style} >
                {
                    React.Children.toArray(
                        this.makeClue(this.props.col)
                    )
                }
            </div>
        )
    }
}

export default Clue;