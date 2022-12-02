const { input, SHAPES } = require('./input');

const rounds = input.map(([left_shape, right_shape]) => {
	const left = SHAPES[left_shape];

	if (right_shape === 'X') {
		// Lose
		let right = left - 1 || 3; // If 0, loop to 3 (paper)
		return right;
	} else if (right_shape === 'Y') {
		// Draw
		return left + 3;
	} else {
		// Win
		let right = (left + 1) % 3 || 3; // If 0, loop to 3 (paper)
		return right + 6;
	}
});

console.log(rounds.reduce((a, b) => a + b, 0));
