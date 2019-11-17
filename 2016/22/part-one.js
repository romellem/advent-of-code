const { input } = require('./input');
const G = require('generatorics');

const nodes = Object.values(input);

let valid_nodes = 0;
for (let [node_a, node_b] of G.permutation(nodes, 2)) {
	if (node_a.used > 0 && node_a.used < node_b.available) {
		valid_nodes++;
	}
}

console.log(valid_nodes);
