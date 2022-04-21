// Write your tests here
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import AppFunctional from "./AppFunctional";

test("sanity", () => {
  expect(false).toBe(false);
});

beforeEach(() => {
  render(<AppFunctional />);
});

describe("Key Pad", () => {
  test("left is present", () => {
    const leftBttn = screen.queryByText("LEFT");
    expect(leftBttn).toBeVisible();
    expect(leftBttn).toBeInTheDocument();
  });
});
