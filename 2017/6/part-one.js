const { input, sampleInput } = require('./input');
const Chip = require('./chip');

let chip = new Chip(input);

console.log(chip.runForOneCycle());
