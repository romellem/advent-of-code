import { input } from './input';
import G from 'generatorics';

interface Equation {
	result: number;
	numbers: number[];
}
type MULT = '*';
type SUM = '+';
const VALID_OPERATIONS = ['*', '+'] as const;

function evaluate(numbers: number[], operations: Array<MULT | SUM>) {
	let result = -1;
	for (let i = 0; i < numbers.length - 1; i++) {
		let a = i === 0 ? numbers[i] : result;
		let b = numbers[i + 1];
		let op = operations[i];

		result = op === '*' ? a * b : a + b;
	}

	return result;
}

function couldBeTrue({ result, numbers }: Equation): boolean {
	// It is OK to fill with the same reference
	const spaces: Array<typeof VALID_OPERATIONS> = Array(numbers.length - 1).fill(VALID_OPERATIONS);

	for (const operations of G.cartesian(...spaces)) {
		const evaluation = evaluate(numbers, operations);
		if (evaluation === result) {
			return true;
		}
	}

	return false;
}

let sum = 0;
for (let equation of input) {
	if (couldBeTrue(equation)) {
		sum += equation.result;
	}
}

console.log(sum);
