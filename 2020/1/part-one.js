const { input } = require('./input');
const G = require('generatorics');

for (let [a, b] of G.combination(input, 2)) {
	if (a + b === 2020) {
		console.log(a, b);
		console.log(a * b);
		return;
	}
}
