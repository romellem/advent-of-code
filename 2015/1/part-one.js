const input = require('./input');

const GO_UP = '(';
const GO_DOWN = ')';

let final_floor = input
    .split('')
    .map(v => (v === GO_UP ? 1 : -1))
    .reduce((a, b) => a + b, 0);

console.log(`Santa ends up on floor "${final_floor}"`);
