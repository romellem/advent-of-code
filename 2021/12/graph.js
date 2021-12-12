const _ = require('lodash');

class Node {
	constructor(id) {
		this.id = id;
		// this.connections = new Set();
		this.connections = [];
	}
}

function isLowerCase(str) {
	return str === str.toLowerCase();
}

class Graph {
	/**
	 * @param {Array<[from, to]>} connections
	 */
	constructor(connections) {
		const node_ids = new Set(connections.flat());

		this.nodes = new Map();
		for (let node_id of node_ids) {
			this.nodes.set(node_id, new Node(node_id));
		}

		// Edits `this.nodes` in place
		this.buildEdges(connections);
	}

	buildEdges(connections) {
		for (let [a, b] of connections) {
			const node_a = this.nodes.get(a);
			const node_b = this.nodes.get(b);

			if (!node_a.connections.includes(b)) node_a.connections.push(b);
			if (!node_b.connections.includes(a)) node_b.connections.push(a);
			// node_a.connections.add(b);
			// node_b.connections.add(a);
		}
	}

	countPaths = (() => {
		const cache = new Map();
		const paths = [];

		return (start, end, i = 0) => {
			if (!paths.length) {
				paths.push([start]);
			}

			let count = 0;
			let still_walking = true;
			while (still_walking) {
				still_walking = false;
				let to_add = [];
				for (let path of paths) {
					let tail_id = path[path.length - 1];
					let tail_node = this.nodes.get(tail_id);

					if (tail_node.connections.length === 1) {
						// Only have one step to take
						path.push(tail_node.connections[0]);
					} else {
						
					}
				}
			}
			
			

			const start_node = this.nodes.get(start);
			
		}
	})();
		(start, end, count = 0, path_lookup = { start: 1 }) => {
			// If current vertex is same as destination, then increment count
			if (start === end) {
				count++;
			} else {
				// Otherwise recurse through all the adjacent vertices

				const start_node = this.nodes.get(start);
				for (let connection of start_node.connections) {
					if (!path_lookup[connection]) {
						path_lookup[connection] = 0;
					}

					// const not_start_or_end = connection !== 'start' && connection !== 'end';
					if (isLowerCase(connection) && connection !== 'end') {
						// If we have visited the lowercase node, then don't allow 2nd visits
						if (path_lookup[connection]) {
							continue;
						}
					}
					path_lookup[connection]++;

					count += this.countPaths(connection, end, count, path_lookup);
				}
			}

			return count;
		},
		(start, end) => (start < end ? start + '-' + end : end + '-' + start)
	);
}

module.exports = { Node, Graph };
