import React from 'react';
import './App.css';

const getStyle = (key) => {
  // 0: Blank
  // 1: Empty Correct
  // 2: Filled Correct
  // 3: Empty Incorrect
  // 4: Filled Incorrect
  switch (key) {
    case 0:
      return 'grid-item grid-item-blank';
    case 1:
      return 'grid-item grid-item-empty-correct';
    case 2:
      return 'grid-item grid-item-filled-correct';
    case 3:
      return 'grid-item grid-item-empty-incorrect';
    case 4:
      return 'grid-item grid-item-filled-incorrect';
    default:
      return 'grid-item grid-item-blank';
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: getStyle(props.style),
    };
  }

  render() {
    return (
      <div
        className={getStyle(this.props.style)}
        onClick={this.props.onClick}
      />
    )
  }
}

class TopClue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="grid-item-top-clue" >
        {this.props.clues}
      </div>
    )
  }
}

class ClueAndRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <div className="grid-item-left-clue">{this.makeBGClue(this.binaryGrid.slice(0,5))}</div>
      <div>
        <div className="grid-item-left-clue">{this.props.clues}</div>
        {this.props.binaryLine}
      </div>
      // {this.renderSquare(0)}
      // {this.renderSquare(1)}
      // {this.renderSquare(2)}
      // {this.renderSquare(3)}
      // {this.renderSquare(4)}
    )
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.gridSize = props.dim*props.dim;
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
    this.topClues = [...Array(props.dim).keys()].map((x) => this.renderTopClue(x));
    this.clueAndRows = [...Array(props.dim).keys()].map((x) => this.renderClueAndRow(x, props.dim*x));
    console.log(this.clueAndRows);
  }

  getBGColumn(start) {
    const result = [];
  
    for (let i = start; i < this.binaryGrid.length; i += this.props.dim) {
      result.push(this.binaryGrid[i]);
    }
  
    return result;
  }

  makeBGClue(binaryLine) {
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

  handleClick(e, i) {
    const squareStates = this.state.squareStates.slice();
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
    this.setState({ squareStates: squareStates });
    // check if we're done
    if (this.existGuessCount === this.existCount) {
      this.done = 'DONE!!!!'
    }
  }

  renderTopClue(i) {
    return (
      <TopClue
        clues={this.makeBGClue(this.getBGColumn(i))}
        key={i}
      />
    );
  }

  renderClueAndRow(i, start) {
    return (
      <ClueAndRow
        clues={this.makeBGClue(this.binaryGrid.slice(start, start+this.props.dim))}
        binaryLine={
          [...Array(this.props.dim).keys()]
            .map(x => x + start)
            .map((x) => this.renderSquare(x))
        }
        key={i}
      />
    );
  }

  renderSquare(i) {
    return (
      <Square
        style={this.state.squareStates[i]}
        onClick={(e) => this.handleClick(e, i)}
        key={i}
      />
    );
  }

  render() {
    return (
      <div className='centered'>
        Click to guess filled.
        <br/>
        Hold CMD and click to guess empty.
        <div className="grid-container">
          <div></div>
          {this.topClues}
          {this.clueAndRows}

          {/* <div className="grid-item-left-clue">{this.makeBGClue(this.binaryGrid.slice(0,5))}</div>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}

          <div className="grid-item-left-clue">{this.makeBGClue(this.binaryGrid.slice(5,10))}</div>
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}

          <div className="grid-item-left-clue">{this.makeBGClue(this.binaryGrid.slice(10,15))}</div>
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}

          <div className="grid-item-left-clue">{this.makeBGClue(this.binaryGrid.slice(15,20))}</div>
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}

          <div className="grid-item-left-clue">{this.makeBGClue(this.binaryGrid.slice(20,25))}</div>
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)} */}
        </div>
        Mistakes: {this.mistakes}
        <br/>
        {this.done}
      </div>
    )
  }
}

function App() {
  return (
    <Board dim={5}/>
  );
}

export default App;
