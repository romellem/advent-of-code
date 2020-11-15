const { partTwoInput } = require('./input');

const offset = parseInt(partTwoInput.slice(0, 7).join(''), 10);
const slice_to_iterate = partTwoInput.slice(offset);
for (let j = 0; j < 100; j++) {
	for (let i = slice_to_iterate.length - 2; i >= 0; i--) {
		slice_to_iterate[i] = (slice_to_iterate[i + 1] + slice_to_iterate[i]) % 10;
	}
}

console.log('8 digits:', slice_to_iterate.slice(0, 8).join(''));
