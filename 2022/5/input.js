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

for (let line = 0; line < raw_stacks_lines.length; line++) {
	const raw_stack_line = raw_stacks_lines[line];
	for (let i = 0; i < raw_stack_line.length - CRATE_SIZE; i++) {
		const start = i * (CRATE_SIZE + 1);
		const end = start + CRATE_SIZE;
		const crate = raw_stack_line.substring(start, end);

		if (!stacks[i]) {
			stacks[i] = [];
		}
		if (crate.trim()) {
			// "[X]" -> "X"
			stacks[i].push(crate.substring(1, 2));
		}
	}
}
debugger;

module.exports = {
	input: 1,
};
