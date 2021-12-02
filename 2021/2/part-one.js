const { input } = require('./input');

let horizontal = 0;
let depth = 0;

for (let { movement, amount } of input) {
	if (movement === 'up') {
		depth -= amount;
	} else if (movement === 'down') {
		depth += amount;
	} else if (movement === 'forward') {
		horizontal += amount;
	} else {
		throw new Error(`Unknown movement: ${movement}`);
	}
}

console.log(depth * horizontal);
