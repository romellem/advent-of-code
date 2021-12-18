const { input, splitLineWithNumbers } = require('./input');
const { add, reduce, magnitude } = require('./snailfish');
const assert = require('assert');

function partOne() {
	let accumulator = input.shift();
	while (input.length > 0) {
		let next_pair = input.shift();

		accumulator = add(accumulator, next_pair);
		reduce(accumulator);
	}

	const mag = magnitude(splitLineWithNumbers(accumulator));

	console.log(mag);
}

function testMagnitude() {
	const tests = [
		['[[1,2],[[3,4],5]]', 143],
		['[[[[0,7],4],[[7,8],[6,0]]],[8,1]]', 1384],
		['[[[[1,1],[2,2]],[3,3]],[4,4]]', 445],
		['[[[[3,0],[5,3]],[4,4]],[5,5]]', 791],
		['[[[[5,0],[7,4]],[5,5]],[6,6]]', 1137],
		['[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]', 3488],
	];

	for (let [str, expected] of tests) {
		const mag = magnitude(splitLineWithNumbers(str));

		assert.strictEqual(mag, expected);
	}
}

testMagnitude();

// partOne();

// 3900 too low
// 3990 too low
