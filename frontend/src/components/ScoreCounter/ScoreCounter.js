import React, { useState } from "react";
import plus from '../../images/plus.svg'
import minus from '../../images/minus.svg'
import "./scoreCounter.css";
import { Button } from "react-bootstrap";

export default function ScoreCounter() {
  const [counter, setCounter] = useState(0);
  const max_score = 11;
  const handleIncrement = () => {
    if (counter < max_score) {
      setCounter(counter + 1);
    }
  };
  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };
  return (
    <>
      <div className="counterContainer">
        <div className="upper">
          <Button
            onClick={handleDecrement}
            variant="light"
            className="delete_icon"
            disabled={counter === 0}
          >
            <img src={minus} alt="decrement" />
          </Button>
        </div>
        <div className="middle">{counter}</div>
        <div className="lower">
          <Button
            onClick={handleIncrement}
            className="add_icon"
            disabled={max_score === counter}
          >
            <img src={plus} alt="increment" />
          </Button>
        </div>
      </div>
    </>
  );
}
