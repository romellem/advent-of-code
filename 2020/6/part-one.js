const { input } = require('./input');

let arr = [];
for (let lines of input) {
	let lookup = {};
	let people = lines.split('\n');
	for (let p of people) {
		for (let char of p) {
			lookup[char] = true;
		}
	}
	arr.push(Object.keys(lookup).length);
}

let total = arr.reduce((a, b) => a + b, 0);

console.log(total);
