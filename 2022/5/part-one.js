const { input } = require('./input');
const { stacks, instructions } = input;

for (let { count, from, to } of instructions) {
	for (let c = 0; c < count; c++) {
		let crate = stacks[from].pop();
		stacks[to].push(crate);
	}
}

const top_crates = stacks.map((stack) => stack[stack.length - 1]).join('');
console.log(top_crates);
