const G = require('generatorics');
const { input } = require('./input');
const { Circuit } = require('./circuit');

let max_output = Number.MIN_SAFE_INTEGER;
for (var phase_settings of G.permutation([0, 1, 2, 3, 4])) {
	let circuit = new Circuit(input, phase_settings);
	let output = circuit.run();
	if (output > max_output) {
		max_output = output;
	}
}

console.log(max_output);
