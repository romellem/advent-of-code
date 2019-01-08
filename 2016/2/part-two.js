const { input, sampleInput } = require('./input');
const Keypad = require('./keypad');

let keypad = new Keypad({ type: 'diamond' });

// Still start on the 5, which is on the left corner
const DIAMOND_STARTING_POINT = [0, 2];

console.log(keypad.pressAll(input, DIAMOND_STARTING_POINT));

