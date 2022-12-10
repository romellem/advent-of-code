const { input } = require('./input');

let reg = {
	x: 1,
};

let values = new Map();

let cycle = 1;
let instruction = null;
let i = 0;
do {
	let to_be_added = null;
	if (instruction !== null) {
		to_be_added = instruction;
		instruction = null;
	} else {
		let [op, n] = input[i] || [];
		if (op === 'addx') {
			instruction = n;
		}
		i++;
	}

	// cycle finishes
	values.set(cycle, reg.x * cycle);

	if (to_be_added !== null) {
		reg.x += to_be_added;
	}

	cycle++;
} while (i < input.length);

let sum = [
	values.get(20),
	values.get(60),
	values.get(100),
	values.get(140),
	values.get(180),
	values.get(220),
].reduce((a, b) => a + b, 0);

console.log(sum);
