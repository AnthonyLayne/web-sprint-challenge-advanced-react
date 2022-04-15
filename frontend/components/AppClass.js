import React from "react";

import { API } from "../helpers/endpoint";
import { DEFAULT_STATE } from "../helpers/defaultState";

import { getCoordinates } from "../helpers/coordinates";

//need to find out current position, then the position the B moved to and set the state to that.
//need a submit handler to POST the x/y position, email and number of clicks to the API.
//up = -3, down = +3, left= -1, right= +1
//coordinates -> x = horizontal(left -1,right +1), y = verticle(up -1/down +1), Coordinates(x,y)
//need current coordinates to determine future coordinates upon clicking keypad buttons.

export default class AppClass extends React.Component {
  state = DEFAULT_STATE;

  handleClick = (x, y) => {
    this.setState((prevState) => {
      const { rowLength: prevRowLength, grid: prevGrid, clicks: prevClicks } = prevState;
      const { x: currX, y: currY } = getCoordinates(prevGrid, prevRowLength);
      //
    });
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {DEFAULT_STATE.grid.map(() => {
            return (
              <div key="idx" className="square">
                {}
              </div>
            );
          })}
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.handleClick()}>
            LEFT
          </button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
