const path = require('path');
const fs = require('fs');

const [raw_stacks, raw_instructions] = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n');

const CRATE_SIZE = '[X]'.length;
const raw_stacks_lines = raw_stacks.split('\n');
// Remove last line of " 1   2   3   4   5   6   7   8   9 "
raw_stacks_lines.pop();

const stacks = [];

for (let raw_stack_line of raw_stacks_lines) {
	for (let i = 0; i < raw_stack_line.length; i += CRATE_SIZE + 1) {
		const start = i;
		const end = start + CRATE_SIZE;
		const crate = raw_stack_line.substring(start, end);

		const stack_index = i / (CRATE_SIZE + 1);
		if (!stacks[stack_index]) {
			stacks[stack_index] = [];
		}
		if (crate.trim()) {
			// "[X]" -> "X"
			stacks[stack_index].push(crate.substring(1, 2));
		}
	}
}

// Now the "top" item of the stack is the first item within all the arrays.
// It's easier to have this at the end so we can `pop` them, so reverse all
// our stacks
for (let stack of stacks) {
	stack.reverse();
}

// Now parse move instructions
const instructions = raw_instructions.split('\n').map((line) => {
	// e.g. `move 13 from 3 to 6`
	let [, count, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(line);
	count = parseInt(count, 10);
	// Stacks are 0-indexed
	from = parseInt(from, 10) - 1;
	to = parseInt(to, 10) - 1;

	return { count, from, to };
});

module.exports = {
	input: {
		stacks,
		instructions,
	},
};
