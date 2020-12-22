class Node {
	constructor(value, index) {
		this.value = value;
		this.index = index;
		this.connections = [];
	}
}

class DiGraph {
	constructor(items) {
		// Assumes `items` is already sorted
		this.items = items.map((v, i) => new Node(v, i));
		this.buildEdges();
	}

	buildEdges() {
		for (let i = 0; i < this.items.length; i++) {
			let current = this.items[i];

			for (let n = 1; n <= 3; n++) {
				let next = this.items[i + n];
				if (!next) break;
				if (next.value - current.value <= 3) {
					current.connections.push(next);
				}
			}
		}
	}

	/**
	 * Recursive way to count the number of unique paths from one
	 * index within a directed graph to another.
	 *
	 * @returns {Number}
	 */
	countPathsUtil(current_index, destination_index, path_count) {
		// If current vertex is same as destination, then increment count
		if (current_index === destination_index) {
			path_count++;
		} else {
			let node = this.items[current_index];
			for (let connection of node.connections) {
				path_count = this.countPathsUtil(connection.index, destination_index, path_count);
			}
		}
		return path_count;
	}

	countPaths() {
		let path_count = this.countPathsUtil(0, this.items.length - 1, 0);
		return path_count;
	}
}

module.exports = { Node, DiGraph };
