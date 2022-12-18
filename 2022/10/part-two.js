const { input } = require('./input');

// The CPU has a single register, `X`, which starts with the value `1`.
let register = 1;

// You count the pixels on the CRT: 40 wide and 6 high.
const frame = Array(6)
	.fill()
	.map(() => Array(40).fill(' '));

for (let cycle = 1; cycle <= input.length; cycle++) {
	const cycle_index = cycle - 1;
	const { op, n } = input[cycle_index];

	// Middle of instruction executing, record our pixel
	const frame_row = Math.floor(cycle_index / 40);
	const position = cycle_index % 40;
	const in_sprite = position >= register - 1 && position <= register + 1;
	// Use different chars to make reading the ASCII easier
	const char = in_sprite ? '█' : ' ';
	frame[frame_row][position] = char;

	if (op === 'addx') {
		register += n;
	}
}

const screen = frame.map((r) => r.join('')).join('\n');

console.log(screen);
