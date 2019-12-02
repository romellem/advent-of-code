// @see https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/

/*
    Graph shown below, nodes are denoted with parens `($ID)`
    and distances between node are within the edges connection the nodes

         (1)--8--(2)--7--(3)
         /|       |\      |\
        4 |       2 \     | 9
       /  |       |  \   14  \
      /  11   7--(8)  \   |  (4)
    (0)   |  /    |    4  |   |
     \    | /     6     \ |  10
      \   |/      |      \| /
       8-(7)--1--(6)--2--(5)
*/

class Node {
	constructor(id) {
		this.id = id;

		// [node, distance]
		this.connections = new Map();
	}

	addConnection(node, distance = 1) {
		if (!this.connections.has(node)) {
			this.connections.set(node, distance);
			node.connections.set(this, distance);
		}
	}
}

class Graph {
	constructor(nodes, root_id = 0) {
		this.nodes = nodes;
		this.root_node = this.nodes.find(({ id }) => id === root_id);
		this.distancedFromRoot = new Map(
			this.nodes.map(node => [node, node === this.root_node ? 0 : Number.POSITIVE_INFINITY])
		);
	}

	setRoot(root_id) {
		this.root_node = this.nodes.find(({ id }) => id === root_id);

		// Reset distances
		this.distancedFromRoot = new Map(
			this.nodes.map(node => [node, node === this.root_node ? 0 : Number.POSITIVE_INFINITY])
		);
	}

	calculateDistancesFromRoot() {
		const shortest_path_tree_set = new Map();
		let nodes_added = 0;
		while (nodes_added < this.nodes.length) {
			// Get shortest distance from this.distancedFromRoot that we haven't already seen
			let shortest_distance = Number.POSITIVE_INFINITY;
			let shortest_distance_node;
			for (let [node, distance] of this.distancedFromRoot) {
				if (!shortest_path_tree_set.has(node) && distance < shortest_distance) {
					shortest_distance = distance;
					shortest_distance_node = node;
				}
			}

			// Add the set of nodes we've calculated distances from
			shortest_path_tree_set.set(shortest_distance_node, true);
			nodes_added++;

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

let _0 = new Node(0);
let _1 = new Node(1);
let _2 = new Node(2);
let _3 = new Node(3);
let _4 = new Node(4);
let _5 = new Node(5);
let _6 = new Node(6);
let _7 = new Node(7);
let _8 = new Node(8);

_0.addConnection(_1, 4);
_0.addConnection(_7, 8);

_1.addConnection(_2, 8);
_1.addConnection(_7, 11);

_2.addConnection(_3, 7);
_2.addConnection(_5, 4);
_2.addConnection(_8, 2);

_3.addConnection(_4, 9);
_3.addConnection(_5, 14);

_4.addConnection(_5, 10);

_5.addConnection(_6, 2);

_6.addConnection(_8, 6);
_6.addConnection(_7, 1);

_7.addConnection(_8, 7);

let g = new Graph([_0, _1, _2, _3, _4, _5, _6, _7, _8]);

console.log(g.calculateDistancesFromRoot());
