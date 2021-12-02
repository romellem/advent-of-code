const { input } = require('./input');

let horizontal = 0;
let depth = 0;
let aim = 0;

for (let { movement, amount } of input) {
	if (movement === 'up') {
		aim -= amount;
	} else if (movement === 'down') {
		aim += amount;
	} else if (movement === 'forward') {
		horizontal += amount;
		depth += aim * amount;
	} else {
		throw new Error(`Unknown movement: ${movement}`);
	}
}

console.log(depth * horizontal);
