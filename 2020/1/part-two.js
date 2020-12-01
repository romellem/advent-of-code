const { input } = require('./input');
const G = require('generatorics');

for (let [a, b, c] of G.combination(input, 3)) {
	if (a + b + c === 2020) {
		console.log({ a, b, c });
		console.log('a * b * c = ', a * b * c);
		return;
	}
}
