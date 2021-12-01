const { input } = require('./input');

let count = 0;
for (let i = 0; i < input.length - 1; i++) {
	let current = input[i];
	let next = input[i + 1];

	if (next > current) {
		count++;
	}
}

console.log(count);
