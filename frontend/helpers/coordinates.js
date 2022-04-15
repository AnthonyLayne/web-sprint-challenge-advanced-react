//[0] -> (1,1)
//[1] -> (2,1)
//[2] -> (3,1)
//[3] -> (1,2)
//[4] -> (2,2)
//[5] -> (3,2)
//[6] -> (1,3)
//[7] -> (2,3)
//[8] -> (3,3)

export const coordinates = (grid) => {
  let x = 0;
  let y = 0;
  let currentIndex = grid.findIndex((index) => index === "B");

  if (currentIndex === 0) {
    x = 1;
    y = 1;
    return currentIndex(x, y);
  } else if (currentIndex === 1) {
    x = 2;
    y = 1;
    return currentIndex(x, y);
  } else if (currentIndex === 2) {
    x = 3;
    y = 1;
    return currentIndex(x, y);
  } else if (currentIndex === 3) {
    x = 1;
    y = 2;
    return currentIndex(x, y);
  } else if (currentIndex === 4) {
    x = 2;
    y = 2;
    return currentIndex(x, y);
  } else if (currentIndex === 5) {
    x = 3;
    y = 2;
    return currentIndex(x, y);
  } else if (currentIndex === 6) {
    x = 1;
    y = 3;
    return currentIndex(x, y);
  } else if (currentIndex === 7) {
    x = 2;
    y = 3;
    return currentIndex(x, y);
  } else if (currentIndex === 8) {
    x = 3;
    y = 3;
    return currentIndex(x, y);
  } else {
    return null;
  }
};
