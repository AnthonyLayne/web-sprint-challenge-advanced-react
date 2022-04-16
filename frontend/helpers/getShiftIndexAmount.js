export const getShiftIndexAmount = (rowLength, id) => {
  const obj = {
    left: -1,
    up: -rowLength,
    right: 1,
    down: rowLength,
  };

  return obj[id];
};
