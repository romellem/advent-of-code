import { input } from './input';

function isDuplicate(num: number) {
	const numStr = num.toString();
	if (numStr.length % 2 !== 0) {
		return false;
	}

	const mid = numStr.length / 2;

	const first = numStr.slice(0, mid);
	const last = numStr.slice(mid);

	return first === last;
}

function getDuplicateNumbers(lower: number, upper: number): Array<number> {
	let invalid: Array<number> = [];
	for (let i = lower; i <= upper; i++) {
		if (isDuplicate(i)) {
			invalid.push(i);
		}
	}

	return invalid;
}

const dupes = input.flatMap(({ first, last }) => getDuplicateNumbers(first, last));
const sum = dupes.reduce((a, b) => a + b, 0);

console.log('Part 1:', sum);
