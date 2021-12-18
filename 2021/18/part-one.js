const { input } = require('./input');
const { add, reduce, magnitude } = require('./snailfish');

let accumulator = input.shift();
while (input.length > 0) {
	let next_pair = input.shift();

	accumulator = add(accumulator, next_pair);
	reduce(accumulator);
}

const mag = magnitude(accumulator);

console.log(mag);

// 3900 too low
