const { input } = require('./input');

let reg = {
	x: 1,
};

let frame = Array(6)
	.fill()
	.map(() => Array(40).fill(' '));

let cycle = 0;
let instruction = null;
let i = 0;
do {
	let to_be_added = null;
	if (instruction === null) {
		let [op, n] = input[i] || [];
		if (op === 'addx') {
			instruction = n;
		}
		i++;
	} else {
		to_be_added = instruction;
		instruction = null;
	}

	// cycle finishes
	let pos = cycle % 40;
	let char = pos === reg.x || pos === reg.x - 1 || pos === reg.x + 1 ? '#' : ' ';
	frame[Math.floor(cycle / 40)][pos] = char;

	if (to_be_added !== null) {
		reg.x += to_be_added;
	}

	cycle++;
} while (i < input.length);

let pic = frame.map((r) => r.join('')).join('\n');

console.log(pic);
