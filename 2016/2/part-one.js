const { input, sampleInput } = require('./input');
const Keypad = require('./keypad');

let keypad = new Keypad();
console.log(keypad.pressAll(input));

