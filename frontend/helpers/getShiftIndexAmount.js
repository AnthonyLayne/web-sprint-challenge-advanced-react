export const getShiftIndexAmount = (rowLength) => ({
  left: -1,
  up: -rowLength,
  right: 1,
  down: rowLength,
});
