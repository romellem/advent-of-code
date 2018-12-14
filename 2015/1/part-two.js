const input = require('./input');

const GO_UP = '(';
const GO_DOWN = ')';

let instructions = input.split('').map(v => (v === GO_UP ? 1 : -1));

let accumulator = 0;
let i;
for (i = 0; i < instructions.length; i++) {
    let instruction = instructions[i];
    accumulator += instruction;

    if (accumulator < 0) {
        break;
    }
}

// The list in the puzzle is not zero-index based, so add one to our index here to get the answer
console.log(`Santa first enters the basement at instructions "${i + 1}"`);
