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

// Dial starts at 50
const dialValues = [50];

for (let { direction, degree } of input) {
	const currentNumber = dialValues.at(-1)!;
	const nextNumber = rotate({
		currentNumber,
		direction,
		degree,
	});

	dialValues.push(nextNumber);
}

// > The actual password is the number of times the dial is left
// > pointing at 0 after any rotation in the sequence.
const dialZeroes = dialValues.filter((v) => v === 0);
const numZeroes = dialZeroes.length;

console.log('Part 1:', numZeroes);
