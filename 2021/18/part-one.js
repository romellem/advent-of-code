const { input } = require('./input');
const { add, reduce } = require('./snailfish');

let accumulator = input.shift();
while (input.length > 0) {
	let next_pair = input.shift();

	accumulator = add(accumulator, next_pair);
	reduce(accumulator);
}

console.log(accumulator.join(''));
