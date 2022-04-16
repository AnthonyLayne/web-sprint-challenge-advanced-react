// [0] -> (1,1)
// [1] -> (2,1)
// [2] -> (3,1)
// [3] -> (1,2)
// [4] -> (2,2)
// [5] -> (3,2)
// [6] -> (1,3)
// [7] -> (2,3)
// [8] -> (3,3)

/*
rowLength === 3
columnLength === 3
grid.forEach((square, i) => {
    const squareIdx = i + 1; // [6] -> (1,3)  |>  [7]

    const xPos = squareIdx % rowLength; // [6] -> (1,3)  |>  7 % 3 === 1
    const yPos = Math.ceil(squareIdx / rowLength); // [6] -> (1,3)  |>  7 / 3 === 2.3  |>  3
    // result |> (1, 3)

    console.log(`(${xPos}, ${yPos})`); // (1, 1), (2, 1), etc.
})
*/

/**
 * This function takes the grid and the rowLength and returns the x,y coords of the active square
 * @param {*} grid `[null, null, null, null, "B", null, null, null, null]`
 * @param {*} rowLength The number of rows in the grid
 * @returns `{ x: number, y: number }`
 */
export const getCoordinates = (grid, rowLength) => {
  let currentArrayIndex = 0;
  let xPos = 0;
  let yPos = 0;

  grid.some((square, i) => {
    if (square === "B") {
      const squareIdx = i + 1; // [6] -> (1,3)  |>  [7]
      const rowModulus = squareIdx % rowLength;

      currentArrayIndex = i;
      xPos = rowModulus === 0 ? rowLength : rowModulus; // [6] -> (1,3)  |>  7 % 3 === 1
      yPos = Math.ceil(squareIdx / rowLength); // [6] -> (1,3)  |>  7 / 3 === 2.3  |>  3
      // result |> (1, 3)

      return true; // stop iterating once the active square has been found...
    }
  });

  return { x: xPos, y: yPos, currentArrayIndex };
};

//   let currentIndex = grid.findIndex((square) => square === "B");
//   if (currentIndex === 0) return [1, 1];
//   if (currentIndex === 1) return [2, 1];
//   if (currentIndex === 2) return [3, 1];
//   if (currentIndex === 3) return [1, 2];
//   if (currentIndex === 4) return [2, 2];
//   if (currentIndex === 5) return [3, 2];
//   if (currentIndex === 6) return [1, 3];
//   if (currentIndex === 7) return [2, 3];
//   if (currentIndex === 8) return [3, 3];
//   return { x: null, y: null };
