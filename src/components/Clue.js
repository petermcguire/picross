import React from 'react';

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
            clue.push(run);
            run = 0;
          }
        }
      })
  
      // account for hanging run, if exists
      if (run > 0) {
        clue.push(run)
      }
  
      // if no clues, add 0
      if (clue.length === 0) {
        clue.push(0)
      }
  
      return clue;
    }
  
    render() {
      return (
        <div className={this.props.style} >
          {this.makeClue(this.props.col)}
        </div>
      )
    }
  }

  export default Clue;