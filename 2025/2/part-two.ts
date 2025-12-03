import _ from 'lodash';
import { sampleInput as input } from './input';

const getDivisors = _.memoize((num: number): Array<number> => {
	const divisors: Array<number> = [];

	// Simple loop, probably a faster way but good enough for my small values
	for (let i = 1; i <= num; i++) {
		if (num % i === 0) {
			divisors.push(i);
		}
	}

	return divisors;
});

function isDuplicate(num: number, numChunks: number) {
	const numStr = num.toString();

	const chunkSize = numStr.length / numChunks;
	const chunks = _.chunk(numStr.split(''), chunkSize).map((parts) => parts.join(''));
	const uniqueChunks = new Set(chunks);

	return uniqueChunks.size === 1;
}

function isSomeDuplicate(num: number) {
	const numStr = num.toString();
	const allChunks = getDivisors(numStr.length);
	for (let chunk of allChunks) {
		if (isDuplicate(num, chunk)) {
			return true;
		}
	}

	return false;
}

function getDuplicateNumbers(lower: number, upper: number): Array<number> {
	let invalid: Array<number> = [];

	// Naive loop, fast enough for my inputs
	for (let i = lower; i <= upper; i++) {
		if (isSomeDuplicate(i)) {
			invalid.push(i);
		}
	}

	return invalid;
}

const dupes = input.flatMap(({ first, last }) => getDuplicateNumbers(first, last));
console.log(dupes);
const sum = dupes.reduce((a, b) => a + b, 0);

console.log('Part 2:', sum);
