const { input } = require('./input');
const { add, reduce, magnitude } = require('./snailfish');
const G = require('generatorics');

const all_magnitudes = [];
for (let [a, b] of G.permutation(input, 2)) {
	let new_pair = add(a, b);
	const reduction = reduce(new_pair);
	let mag = magnitude([...reduction]);
	all_magnitudes.push([mag, reduction]);
}

all_magnitudes.sort((a, b) => b[0] - a[0]);
const top_magnitude = all_magnitudes[0];

console.log(top_magnitude[0]);
