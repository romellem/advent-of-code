const { input, sampleInputs, parseLines } = require('./input');
const Formula = require('./formula');

let a = new Formula(sampleInputs[1].formula);
console.log(a.calculateOreTo('FUEL', 1));
console.log(a.leftover);
