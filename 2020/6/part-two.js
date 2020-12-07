const { input } = require('./input');

let arr = [];
for (let lines of input) {
	let lookup = {};
	let people = lines.split('\n');
	for (let p of people) {
		for (let char of p) {
			if (!lookup[char]) lookup[char] = 0;
			lookup[char]++;
		}
	}
	let total = Object.entries(lookup).filter(([_, v]) => v === people.length);
	arr.push(total.length);
}

let total = arr.reduce((a, b) => a + b, 0);

console.log(total);
