const { input, sampleInput } = require('./input');

function getPrevValue(history) {
	const differences = [history];
	while (differences.at(-1).some((v) => v !== 0)) {
		const lastHistory = differences.at(-1);
		const sequence = [];
		differences.push(sequence);
		for (let i = 0; i < lastHistory.length - 1; i++) {
			let a = lastHistory[i];
			let b = lastHistory[i + 1];
			sequence.push(b - a);
		}
	}

	// Zeroes are now the first sequence
	differences.reverse();

	let prevValue = 0;

	// Start at 2nd sequence since 1st is just zeroes
	for (let i = 1; i < differences.length; i++) {
		prevValue = differences[i][0] - prevValue;
	}

	return prevValue;
}

const sumPrevValues = input.map((history) => getPrevValue(history)).reduce((a, b) => a + b, 0);

console.log(sumPrevValues);
