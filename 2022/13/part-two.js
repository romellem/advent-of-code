const { input } = require('./input');
const G = require('generatorics');

let data = '';
for (let comb of G.combination(input, 3)) {
	data += comb.join('');
}

console.log(data);
