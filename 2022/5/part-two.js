const { input } = require('./input');
const { stacks, instructions } = input;

for (let { count, from, to } of instructions) {
	// Negative `start` index counts back from the end of the array
	let group_crates = stacks[from].splice(-1 * count, count);
	stacks[to].push(...group_crates);
}

const top_crates = stacks.map((stack) => stack[stack.length - 1]).join('');
console.log(top_crates);
