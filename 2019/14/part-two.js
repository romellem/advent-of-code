const { strictEqual } = require('assert');
const { input, sampleInputs } = require('./input');
const Formula = require('./formula');

for (let { formula, max_fuel } of sampleInputs) {
	// Not all our test cases have pre-calculated max-fuel. Skip the ones that don't.
	if (!max_fuel) {
		continue;
	}

	let test_formula = new Formula(formula);
	let test_max_fuel = test_formula.calculateMaxFuelGivenOre();
	strictEqual(max_fuel, test_max_fuel);
}

let formula = new Formula(input);
let fuel = formula.calculateMaxFuelGivenOre();
console.log(fuel);
