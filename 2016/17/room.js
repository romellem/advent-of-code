const jsnx = require('jsnetworkx');
const crypto = require('crypto');

const md5 = str =>
	crypto
		.createHash('md5')
		.update(str)
		.digest('hex');

const directionsFromHash = hash => {
	const u = hash[0];
	const d = hash[1];
	const l = hash[2];
	const r = hash[3];

	return {
		U: u === 'b' || u === 'c' || u === 'd' || u === 'e' || u === 'f',
		D: d === 'b' || d === 'c' || d === 'd' || d === 'e' || d === 'f',
		L: l === 'b' || l === 'c' || l === 'd' || l === 'e' || l === 'f',
		R: r === 'b' || r === 'c' || r === 'd' || r === 'e' || r === 'f',
	};
};

const directionsFromPasscode = passcode => directionsFromHash(md5(passcode));

class Node {
	constructor(seed, depth, x, y, direction = '') {
		// Used to create unique nodes
		this.seed = seed;

		this.depth = depth;
		this.x = x;
		this.y = y;

		this.direction = direction;
	}

	// @returns {Array<Node>}
	generateDeeperNodes(directions) {
		const new_nodes = [];
		const { U, D, L, R } = directions;

		// Up
		if (this.y > 1 && U) {
			new_nodes.push(
				nodeFactory(this.depth + 1, this.x, this.y - 1, 'U')
			);
		}

		// Down
		if (this.y < 4 && D) {
			new_nodes.push(
				nodeFactory(this.depth + 1, this.x, this.y + 1, 'D')
			);
		}

		// Left
		if (this.x > 1 && L) {
			new_nodes.push(
				nodeFactory(this.depth + 1, this.x - 1, this.y, 'L')
			);
		}

		// Right
		if (this.x < 4 && R) {
			new_nodes.push(
				nodeFactory(this.depth + 1, this.x + 1, this.y, 'R')
			);
		}

		return new_nodes;
	}

	toString() {
		return `${this.seed}-${this.x}-${this.y}`;
	}
}

const nodeFactory = (() => {
	let seed = 0;

	return (...args) => new Node(seed++, ...args);
})();

class Room {
	constructor(passcode, look_for_shortest = true) {
		this.passcode = passcode;
		this.graph = new jsnx.DiGraph();
		this.origin = nodeFactory(0, 1, 1);
		this.targets = [];

		this.look_for_shortest = look_for_shortest;

		this.graph.addNode(this.origin);

		this.generateGraph('', this.origin);
	}

	generateGraph(path, node) {
		if (node.x === 4 && node.y === 4) {
			this.targets.push(node);
			return;
		}

		if (this.look_for_shortest && this.targets.length > 0) {
			/// If current node is deeper than all solutions, then bail
			const might_find_better_path = this.targets.some(
				n => node.depth < n.depth
			);
			if (!might_find_better_path) {
				return;
			}
		}

		const directions = directionsFromPasscode(this.passcode + path);
		const new_nodes = node.generateDeeperNodes(directions);

		for (let new_node of new_nodes) {
			this.graph.addEdge(node, new_node);
			this.generateGraph(path + new_node.direction, new_node);
		}
	}

	getShortestPath() {
		let paths_arr = this.targets.map(end => {
			return jsnx.bidirectionalShortestPath(this.graph, this.origin, end);
		});

		paths_arr.sort((a, b) => a.length - b.length);
		let paths = paths_arr.map(path_arr =>
			path_arr.reduce((path, node) => path + node.direction, '')
		);

		return paths[0];
	}

	getLongestPathLength() {
		let paths_arr = this.targets.map(end => {
			return jsnx.bidirectionalShortestPath(this.graph, this.origin, end);
		});

		paths_arr.sort((a, b) => a.length - b.length);
		let paths = paths_arr.map(path_arr => path_arr.length);

		// Path includes first node, I don't need that
		return paths[paths.length - 1] - 1;
	}
}

module.exports = { Room, nodeFactory, Node };
