const { input } = require('./input');
const G = require('generatorics');
const sum = (a, b) => a + b;
const byAscending = (a, b) => a - b;

const hasSum = (num, list) => {
	for (let [x, y] of G.combination(list, 2)) {
		if (x + y === num) {
			return true;
		}
	}
	return false;
};

function partOne(input) {
	const JUMP = 25;
	for (let i = JUMP; i < input.length - 1; i++) {
		let num = input[i];
		let prev = input.slice(i - JUMP, i);
		if (!hasSum(num, prev)) {
			return num;
		}
	}
}

const part_one_answer = partOne(input);

function partTwo(input) {
	for (let nums = 2; nums < input.length - 1; nums++) {
		for (let i = 0; i < input.length - nums; i++) {
			let vals = input.slice(i, i + nums);
			if (vals.reduce(sum) === part_one_answer) {
				vals.sort(byAscending);
				let smallest = vals[0];
				let largest = vals[vals.length - 1];

				return smallest + largest;
			}
		}
	}
}

const part_two_answer = partTwo(input);
console.log(part_two_answer);
