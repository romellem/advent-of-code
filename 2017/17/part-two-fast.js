// @link https://www.reddit.com/r/adventofcode/comments/7kc0xw/2017_day_17_solutions/drd6qd4/
// "For the second part it, I realized that you didn't need to store
// any elements other than the one inserted to the right of 0."
const step = require('./input');

const INSTRUCTIONS = 50000000;
let zero = 0,
    neighbor = 0,
    pos = 0;

for (let i = 1; i < INSTRUCTIONS; i++, pos++) {
    pos = (pos + step) % i; // increased by 1 at end of loop

    if (pos === zero) {
        neighbor = i;
    }

    if (pos < zero) {
        zero++;
    }
}

console.log(neighbor);
