const WINDOW_SIZE = 10;
const window = [];

function updateWindow(newNumbers) {
  const added = [];

  for (const num of newNumbers) {
    if (!window.includes(num)) {
      if (window.length >= WINDOW_SIZE) {
        window.shift(); // remove oldest
      }
      window.push(num);
      added.push(num);
    }
  }

  return added;
}

function getWindow() {
  return window;
}

function getAverage() {
  if (window.length === 0) return 0;
  const sum = window.reduce((a, b) => a + b, 0);
  return sum / window.length;
}

module.exports = { updateWindow, getWindow, getAverage };
