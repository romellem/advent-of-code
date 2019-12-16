const { strictEqual } = require('assert');
const { input, sampleInputs } = require('./input');
const Formula = require('./formula');

for (let { formula, ore } of sampleInputs) {
	let test_formula = new Formula(formula);
	let { ore: test_ore } = test_formula.calculateOreTo('FUEL', 1);
	strictEqual(test_ore, ore);
}

let formula = new Formula(input);
let { ore } = formula.calculateOreTo('FUEL', 1);
console.log(ore);
