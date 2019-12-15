const { input, sampleInputs, parseLines } = require('./input');
const Formula = require('./formula');

let a = new Formula(sampleInputs[0].formula);
console.log(a.calculateOreTo('FUEL', 1));
