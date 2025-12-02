import { input, type Direction } from './input';

type RotateOptions = {
	currentNumber: number;
	direction: Direction;
	degree: number;
};

/**
 * `%` operator is more accurately the "remainder" operator, not the modulo operator
 * (negative dividends return negative results). Create a true modulo operator
 * so results are always positive.
 */
function mod(a: number, n: number): number {
	// `remainder` is a number between -n and n (exclusive)
	const remainder = a % n;

	// `shiftByModulus` is now a number between 0 and 2n (exclusive)
	const shiftByModulus = remainder + n;

	// `result` is now a number between 0 and n
	const result = shiftByModulus % n;

	return result;
}

const MODULUS = 100 as const;

function rotate({ currentNumber, direction, degree }: RotateOptions) {
	// Rotating left is subtracting the degree
	const rawRotation = direction === 'L' ? currentNumber - degree : currentNumber + degree;

	const equivalenceNumber = mod(rawRotation, MODULUS);
	return equivalenceNumber;
}

let currentNumber = 50;
let zeroes = 0;

for (let { direction, degree } of input) {
	const fullRotations = Math.floor(degree / MODULUS);
	zeroes += fullRotations;

	const nextNumber = rotate({
		currentNumber,
		direction,
		degree,
	});

	const atZero = nextNumber === 0;
	const rightPastZero = direction === 'R' && nextNumber < currentNumber;
	const leftPastZero = direction === 'L' && nextNumber > currentNumber;

	if (atZero || rightPastZero || leftPastZero) {
		zeroes++;
	}

	currentNumber = nextNumber;
}

// > You're actually supposed to count the number of times *any click* causes
// > the dial to point at 0, regardless of whether it happens during a rotation
// > or at the end of one.

console.log('Part 2:', zeroes);
