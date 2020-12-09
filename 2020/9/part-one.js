const { input } = require('./input');
const G = require('generatorics');

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
console.log(part_one_answer);
