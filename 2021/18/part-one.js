const { input, splitLineWithNumbers } = require('./input');
const { add, reduce, magnitude } = require('./snailfish');
const assert = require('assert');
const { sample } = require('lodash');

function testAdditionReduction() {
	const sample_input = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`
		.split('\n')
		.map((v) => splitLineWithNumbers(v));

	const steps = [
		'[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]',
		'[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]',
		'[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]',
		'[[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]',
		'[[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]',
		'[[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]',
		'[[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]',
		'[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]',
		'[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]',
	];

	let accumulator = sample_input.shift();
	while (sample_input.length > 0) {
		let next_pair = sample_input.shift();

		accumulator = add(accumulator, next_pair);
		reduce(accumulator);

		assert.strictEqual(accumulator.join(''), steps.shift());
	}
}

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

testAdditionReduction();

// partOne();

// 3900 too low
// 3990 too low
