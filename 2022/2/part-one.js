const { input, SHAPES } = require('./input');

const rounds = input.map(([left_shape, right_shape]) => {
	const left = SHAPES[left_shape];
	const right = SHAPES[right_shape];
	const diff = Math.abs(left - right);
	if (left === right) {
		return right + 3;
	} else if ((diff === 1 && right > left) || (right === 1 && left === 3)) {
		return right + 6;
	} else {
		return right;
	}
});

console.log(rounds.reduce((a, b) => a + b, 0));
