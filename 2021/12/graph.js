function isLowerCase(str) {
	return str === str.toLowerCase();
}

function canAddSmallCave(path) {
	let small_caves = new Set();

	// If all lower case caves are unique, we can add the next small
	for (let cave of path) {
		if (!isLowerCase(cave) || cave === 'start') {
			continue;
		}

		if (small_caves.has(cave)) {
			return false;
		}

		small_caves.add(cave);
	}

	return true;
}

class Node {
	constructor(id) {
		this.id = id;
		// this.connections = new Set();
		this.connections = [];
		this.visited = false;
	}
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

	resetNodes() {
		for (let node of this.nodes.values()) {
			node.visited = false;
		}
	}

	getPaths(start, end, { visit_single_small_cave_twice = false } = {}) {
		const finished = [];
		const paths = [[start]];
		while (paths.length > 0) {
			let to_add = [];
			for (let i = 0; i < paths.length; i++) {
				const path = paths[i];

				const tail_id = path[path.length - 1];
				if (tail_id === end) {
					finished.push(path);
					paths.splice(i, 1);
					i--;
					continue;
				}

				const tail = this.nodes.get(tail_id);
				let dead_end = true;
				for (let j = 0; j < tail.connections.length; j++) {
					const connection = tail.connections[j];
					if (isLowerCase(connection) && path.includes(connection)) {
						if (
							visit_single_small_cave_twice &&
							connection !== start &&
							connection !== end &&
							canAddSmallCave(path)
						) {
							// Do nothing, allow the small cave to be added to the path
						} else {
							// We already visited the lowercase cave, skip it
							continue;
						}
					}

					if (dead_end) {
						// If we are here, we can take another stop
						dead_end = false;

						// We also don't need to take another path, its the same one we are on
						path.push(connection);
					} else {
						// Add new paths
						let new_path = path.slice(0, -1);

						new_path.push(connection);
						to_add.push(new_path);
					}
				}

				if (dead_end) {
					// We reached a dead end, so prune this path
					paths.splice(i, 1);
					i--;
				}
			}

			paths.push(...to_add);
		}

		return finished;
	}
}

module.exports = { Node, Graph };
