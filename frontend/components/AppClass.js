import React from "react";

import { API } from "../helpers/endpoint";
import { DEFAULT_STATE } from "../helpers/defaultState";

import { getCoordinates } from "../helpers/coordinates";
import { getShiftIndexAmount } from "../helpers/getShiftIndexAmount";
import axios from "axios";

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

  //The endpoint expects a payload like `{ "x": 1, "y": 2, "steps": 3, "email": "lady@gaga.com" }`

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, clicks, grid, rowLength } = this.state;
    const { x: xPos, y: yPos } = getCoordinates(grid, rowLength);
    axios
      .post(API, {
        email,
        steps: clicks,
        x: xPos,
        y: yPos,
      })
      .then((res) => this.setState(() => ({ error: res.data.message, email: "" })))
      .catch((e) => this.setState(() => ({ error: e.response.data.message })));
  };

  render() {
    const { clicks, grid, error, rowLength, email } = this.state;
    const { className } = this.props;
    const { x: xPos, y: yPos } = getCoordinates(grid, rowLength);

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({xPos}, {yPos})
          </h3>
          <h3 id="steps">
            You moved {clicks} time{clicks === 1 ? "" : "s"}
          </h3>
        </div>
        <div id="grid">
          {grid.map((square, i) => {
            const active = "B" === square;

            const content = active ? "B" : "";

            const classes = ["square"];
            if (active) classes.push("active");
            return (
              <div key={`idx-${i}`} className={classes.join(" ")}>
                {content}
              </div>
            );
          })}
        </div>
        <div className="info">
          <h3 id="message">{error}</h3>
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
          <input
            id="email"
            type="email"
            placeholder="type email"
            value={email}
            onChange={({ target: { value } }) => {
              this.setState({ email: value });
            }}
          ></input>
          <input id="submit" type="submit" onClick={this.handleSubmit}></input>
        </form>
      </div>
    );
  }
}
