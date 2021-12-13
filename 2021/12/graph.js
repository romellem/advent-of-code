function isLowerCase(str) {
	return str === str.toLowerCase();
}

class Node {
	constructor(id) {
		this.id = id;
		this.connections = new Set();
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

	/**
	 * This is slow to do every time we check a new node but it was the best I could come up with.
	 */
	static canAddSmallCave(path, will_be_new_path) {
		let small_caves = new Set();

		// Since we update `path` for first step, don't include that part we will slice off later when testing the cave
		const length = will_be_new_path ? path.length - 1 : path.length;
		for (let i = 0; i < length; i++) {
			const cave = path[i];
			if (!isLowerCase(cave) || cave === 'start') {
				continue;
			}

			// All small caves are not unique, we can't add another one
			if (small_caves.has(cave)) {
				return false;
			}

			small_caves.add(cave);
		}

		return true;
	}

	buildEdges(connections) {
		for (let [a, b] of connections) {
			const node_a = this.nodes.get(a);
			const node_b = this.nodes.get(b);

			node_a.connections.add(b);
			node_b.connections.add(a);
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
				for (let connection of tail.connections) {
					if (isLowerCase(connection) && path.includes(connection)) {
						if (
							visit_single_small_cave_twice &&
							connection !== start &&
							connection !== end &&
							Graph.canAddSmallCave(path, !dead_end)
						) {
							// Do nothing, allow the small cave to be added to the path
						} else {
							// We already visited the lowercase cave, skip it
							// Note that for part one, we alway arrive at this branch since `visit_single_small_cave_twice` is false
							continue;
						}
					}

					if (dead_end) {
						// If we are here, we can take another step
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
