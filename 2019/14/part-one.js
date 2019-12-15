const { input, sampleInputs, parseLines } = require('./input');
const Formula = require('./formula');

let recipe = sampleInputs[1];

let a = new Formula(recipe.formula);
console.log(a.calculateOreTo('FUEL', 1));
console.log(recipe.ore);
