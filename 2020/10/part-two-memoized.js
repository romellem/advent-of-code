const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
	.map((v) => {
		return parseInt(v, 10);
	});

class Node {
	constructor(value, index) {
		this.value = value;
		this.index = index;
		this.connections = [];
	}
}

const sorted_input = input.slice(0).sort((a, b) => a - b);
const max = sorted_input[sorted_input.length - 1] + 3;

const items = [0, ...sorted_input, max].map((v, i) => new Node(v, i));

// Build our edges
for (let i = 0; i < items.length; i++) {
	const current = items[i];

	for (let n = 1; n <= 3; n++) {
		const next = items[i + n];
		if (!next) break;
		if (next.value - current.value <= 3) {
			current.connections.push(next);
		}
	}
}

const _countPaths = _.memoize(
	function countPathsInner(u, d, pathCount) {
		// If current vertex is same as destination, then increment count
		if (u === d) {
			pathCount++;
		}

		// Otherwise recurse through all the adjacent vertices
		else {
			const node = items[u];
			for (let connection of node.connections) {
				// Since we cache our result now, add the return value to our carried count
				pathCount += _countPaths(connection.index, d, pathCount);
			}
		}

		return pathCount;
	},
	// Cache by `start / ending` index
	(u, d) => `${u},${d}`
);

const countPaths = () => {
	return _countPaths(0, items.length - 1, 0);
};

const total = countPaths();
console.log(total);
