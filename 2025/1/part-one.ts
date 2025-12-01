import { input, type Direction } from './input';

type RotateOptions = {
	currentNumber: number;
	direction: Direction;
	degree: number;
	min?: number;
	max?: number;
};

function rotate({ currentNumber, direction, degree, min = 0, max = 100 }: RotateOptions) {
	// Rotating left is subtracting the degree
	if (direction === 'L') {
		degree *= -1;
	}

	const modulus = max - min;

	// Remove any full turns from input
	degree %= modulus;

	// Rotate current number
	let newNumber = currentNumber + degree;

	// Map negative values to positive ones
	if (newNumber < min) {
		newNumber = max + newNumber;
	}

	return newNumber;
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
