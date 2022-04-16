import React from "react";

import { API } from "../helpers/endpoint";
import { DEFAULT_STATE } from "../helpers/defaultState";

import { getCoordinates } from "../helpers/coordinates";
import { getShiftIndexAmount } from "../helpers/getShiftIndexAmount";

//need to find out current position, then the position the B moved to and set the state to that.
//need a submit handler to POST the x/y position, email and number of clicks to the API.
//up = -3, down = +3, left= -1, right= +1
//coordinates -> x = horizontal(left -1,right +1), y = verticle(up -1/down +1), Coordinates(x,y)
//need current coordinates to determine future coordinates upon clicking keypad buttons.

export default class AppClass extends React.Component {
  state = DEFAULT_STATE;

  handleClick = (e) => {
    const { id } = e.target;

    this.setState((prevState) => {
      const {
        columnLength: prevColumnLength,
        rowLength: prevRowLength,
        grid: prevGrid,
        clicks: prevClicks,
      } = prevState;
      const { x: currX, y: currY, currentArrayIndex } = getCoordinates(prevGrid, prevRowLength);

      // Check for out-of-bounds attempts
      if (
        (id === "up" && currY === 1) ||
        (id === "right" && currX === prevRowLength) ||
        (id === "down" && currY === prevColumnLength) ||
        (id === "left" && currX === 1)
      ) {
        return { error: `You can't go ${id}` };
      }

      const shiftIndexAmount = getShiftIndexAmount(this.state.rowLength, id);
      const newIndex = currentArrayIndex + shiftIndexAmount;

      return {
        error: "",
        clicks: prevClicks + 1,
        grid: prevGrid.map((_, i) => (i === newIndex ? "B" : null)),
      };
    });
  };

  render() {
    const { clicks } = this.state;
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved {clicks} times</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((square, i) => {
            return (
              <div key={`idx-${i}`} className="square">
                {square}
              </div>
            );
          })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.error}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.handleClick}>
            LEFT
          </button>
          <button id="up" onClick={this.handleClick}>
            UP
          </button>
          <button id="right" onClick={this.handleClick}>
            RIGHT
          </button>
          <button id="down" onClick={this.handleClick}>
            DOWN
          </button>
          <button id="reset" onClick={() => this.setState(DEFAULT_STATE)}>
            reset
          </button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
