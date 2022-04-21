import React, { useState } from "react";

import { API } from "../helpers/endpoint";
import { DEFAULT_STATE } from "../helpers/defaultState";

import { getCoordinates } from "../helpers/coordinates";
import { getShiftIndexAmount } from "../helpers/getShiftIndexAmount";
import axios from "axios";

export default function AppFunctional(props) {
  const [state, setState] = useState(DEFAULT_STATE);
  const { grid, error, email, clicks } = state;

  const handleClick = (e) => {
    const { id } = e.target;

    setState((prevState) => {
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
        return { ...prevState, error: `You can't go ${id}` };
      }

      const shiftIndexAmount = getShiftIndexAmount(state.rowLength, id);
      const newIndex = currentArrayIndex + shiftIndexAmount;
      console.log({ currX, currY });
      return {
        ...prevState,
        error: "",
        clicks: prevClicks + 1,
        grid: prevGrid.map((_, i) => (i === newIndex ? "B" : null)),
      };
    });
  };

  //The endpoint expects a payload like `{ "x": 1, "y": 2, "steps": 3, "email": "lady@gaga.com" }`

  const handleSubmit = (e) => {
    e.preventDefault();

    const { x: xPos, y: yPos } = getCoordinates(grid, state.rowLength);
    axios
      .post(API, {
        email,
        steps: clicks,
        x: xPos,
        y: yPos,
      })
      .then((res) => setState((prev) => ({ ...prev, error: res.data.message, email: "" })))
      .catch((e) => setState((prev) => ({ ...prev, error: e.response.data.message })));
  };

  const { x: xPos, y: yPos } = getCoordinates(grid, state.rowLength);

  return (
    <div id="wrapper" className={props.className}>
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
        <button id="left" onClick={handleClick}>
          LEFT
        </button>
        <button id="up" onClick={handleClick}>
          UP
        </button>
        <button id="right" onClick={handleClick}>
          RIGHT
        </button>
        <button id="down" onClick={handleClick}>
          DOWN
        </button>
        <button id="reset" onClick={() => setState(DEFAULT_STATE)}>
          reset
        </button>
      </div>
      <form>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={email}
          onChange={({ target: { value } }) => setState((prev) => ({ ...prev, email: value }))}
        ></input>
        <input id="submit" type="submit" onClick={handleSubmit}></input>
      </form>
    </div>
  );
}
