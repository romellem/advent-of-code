const { MICROCHIP, GENERATOR } = require('./input');

class Node {
	constructor(id) {
		this.id = id;

		// [node, distance]
		this.connections = new Map();
	}

	addConnection(node, distance = 1) {
		if (!this.connections.has(node)) {
			this.connections.set(node, distance);
			// node.connections.set(this, distance);
		}
	}
}

class Graph {
	constructor(root_node = null) {
		this.nodes = {};
		this.root_node = null;
	}
	
	addNode(node) {
		if (!this.nodes[node]) {
			this.nodes[node] = node;
		}
	}

	setRoot(node) {
		this.root_node = node;
	}

	calculateDistancesFromRoot() {
		// [[ node_state, distance_from_root ]]
		const distance_from_root = new Map(
			Object.entries(this.nodes).map([node_str, node] => [node, node === this.root_node ? 0 : Number.POSITIVE_INFINITY])
		);

		const shortest_path_tree_set = new Map();
		const all_nodes_keys = Object.keys(this.nodes);
		while (shortest_path_tree_set.size < all_nodes_keys.length) {
			// Get shortest distance from distance_from_root that we haven't already seen
			let shortest_distance = Number.POSITIVE_INFINITY;
			let shortest_distance_node;

			for (let [node, distance] of distance_from_root) {
				if (distance < shortest_distance && !shortest_path_tree_set.has(node)) {
					shortest_distance = distance;
					shortest_distance_node = node;
				}
			}

			// Add to the set of nodes we've calculated distances from
			shortest_path_tree_set.set(shortest_distance_node, true);

			// Calculate the distances to its neighbors
			for (let [node, distance] of shortest_distance_node.connections) {
				if (!shortest_path_tree_set.has(node)) {
					let current_distance_saved = this.distancedFromRoot.get(node);
					// Only update distance if it is shortest than what we've already saved
					if (current_distance_saved > distance + shortest_distance) {
						// Note I only save ths shortest, I don't save longer edges. Do I care about this?
						this.distancedFromRoot.set(node, distance + shortest_distance);
					}
				}
			}
		}

		return [...this.distancedFromRoot]
			.map(([node, distance]) => `${node.id}: ${distance}`)
			.join('\n');
	}

	getDistanceFromRootTo(node) {
		return this.distancedFromRoot.get(node);
	}
}

class RTGPath {
	constructor(floors) {
		this.floors = floors;
		this.elevator = 1;
		this.graph = new Graph();
		this.graph.addNode()
	}

	floorsToStateString() {
		let state_str = this.elevator + ',';
		for (let floor of this.floors) {
			let chips_sum = 0;
			let generators_sum = 0;
			for (let [element, type] of floor) {
				if (type === MICROCHIP) {
					chips_sum++;
				} else {
					generators_sum++;
				}
			}

			// Chips, Generators
			state_str += `${chips_sum},${generators_sum}`;
		}

		return state_str;
	}
}