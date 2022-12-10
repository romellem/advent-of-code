const { input } = require('./input');

let reg = {
	x: 1,
};

let values = new Map();

let cycle = [];
let i = 0;
do {
	let [op, n] = input[i] || [];
	if (op === 'addx') {
		cycle[i + 1] = { n };
	}

	// cycle i finishes
	if (i + 1 === 20 || (i >= 59 && (i + 1 - 20) % 40 === 0)) {
		values.set(i + 1, reg.x * (i + 1));
	}

	if (cycle[i]) {
		reg.x += cycle[i].n;
	}

	i++;
} while (i < input.length || cycle.slice(i).filter(Boolean).length);

let sum = [
	values.get(20),
	values.get(60),
	values.get(100),
	values.get(140),
	values.get(180),
	values.get(220),
].reduce((a, b) => a + b, 0);

console.log(sum);
