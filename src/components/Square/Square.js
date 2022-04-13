import React from 'react';
import './Square.css';

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

function Square(props) {
    return (
      <div
        className={getStyle(props.style)}
        onClick={props.onClick}
      />
    )
  }

  export default Square;