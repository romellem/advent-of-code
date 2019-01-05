const { input, sampleInput } = require('./input');
const Chip = require('./chip');

let chip = new Chip(input);

chip.runForOneCycle();
console.log(chip.runForOneCycle());
