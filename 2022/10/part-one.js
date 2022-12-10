const { input } = require('./input');

// The CPU has a single register, `X`, which starts with the value `1`.
let register = 1;

const signal_strengths = new Map();

for (let cycle = 1; cycle <= input.length; cycle++) {
	const cycle_index = cycle - 1;
	const { op, n } = input[cycle_index];

	// Middle of instruction executing, store signal strength
	signal_strengths.set(cycle, cycle * register);

	if (op === 'addx') {
		register += n;
	}
}

const sum =
	signal_strengths.get(20) +
	signal_strengths.get(60) +
	signal_strengths.get(100) +
	signal_strengths.get(140) +
	signal_strengths.get(180) +
	signal_strengths.get(220);

console.log(sum);
