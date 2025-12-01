import { input as _input, sampleInput as input, type Direction } from './input';

type RotateOptions = {
	currentNumber: number;
	direction: Direction;
	degree: number;
	min?: number;
	max?: number;
};

function rotate({ currentNumber, direction, degree, min = 0, max = 99 }: RotateOptions) {
	// Rotating left is subtracting the degree
	if (direction === 'L') {
		degree *= -1;
	}

	// Range of values in the difference plus 1 (e.g. 0-9 includes 10 numbers)
	const modulus = max - min + 1;

	// Remove any full turns from input
	degree %= modulus;

	// Rotate current number
	let newNumber = currentNumber + degree;

	// Map wrap-around values to ones within the min/max range
	if (newNumber < min) {
		const difference = min - newNumber;
		/**
		 * A value of `-2` with a min of `0` and max of `99` maps to `98` not `99 - 2 = 97`,
		 * so include an extra 1 to account for wrap around
		 */
		newNumber = max - difference + 1;
	} else if (newNumber > max) {
		const difference = newNumber - max;
		// Similarly here
		newNumber = min + difference - 1;
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

console.log(dialValues);

// > The actual password is the number of times the dial is left
// > pointing at 0 after any rotation in the sequence.
const dialZeroes = dialValues.filter((v) => v === 0);
const numZeroes = dialZeroes.length;

console.log('Part 1:', numZeroes);
