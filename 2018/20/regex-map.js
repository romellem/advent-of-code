class RegexNode {
	constructor(x, y) {
		this.id = RegexNode.toId(x, y);
		this.coords = { x, y };

		this.N = undefined;
		this.S = undefined;
		this.E = undefined;
		this.W = undefined;
	}

	static toId(x, y) {
		return `${x},${y}`;
	}

	idToCoord() {
		let [x, y] = this.id.split(',');
		return { x: Number(x), y: Number(y) };
	}

	connect(node, fromSelfToDir) {
		switch (fromSelfToDir) {
			case 'N':
				this.N = node;
				node.S = this;
				break;

			case 'S':
				this.S = node;
				node.N = this;
				break;

			case 'E':
				this.E = node;
				node.W = this;
				break;

			case 'W':
				this.W = node;
				node.E = this;
				break;
		}
	}

	dirTo(node) {
		if (this.N === node) return 'N';
		if (this.E === node) return 'E';
		if (this.S === node) return 'S';
		if (this.W === node) return 'W';
	}
}

class RegexMap {
	constructor() {
		this.atNode = new RegexNode(0, 0);
		this.nodes = new Map([[this.atNode.id, this.atNode]]);
	}

	connect(from, to, dir) {
		from.connect(to, dir);
	}

	N() {
		let { x, y } = this.atNode.coords;
		return this.move(x, y - 1, 'N');
	}
	S() {
		let { x, y } = this.atNode.coords;
		return this.move(x, y + 1, 'S');
	}
	E() {
		let { x, y } = this.atNode.coords;
		return this.move(x + 1, y, 'E');
	}
	W() {
		let { x, y } = this.atNode.coords;
		return this.move(x - 1, y, 'W');
	}

	move(x, y, dir) {
		const nodeId = RegexNode.toId(x, y);
		if (!this.nodes.has(nodeId)) {
			let node = new RegexNode(x, y);
			this.nodes.set(node.id, node);
		}

		const connectingNode = this.nodes.get(nodeId);
		this.atNode.connect(connectingNode, dir);
		this.atNode = connectingNode;
		return this.atNode;
	}

	build(path) {
		let stack = [];

		for (let char of path) {
			if (char === '^' || char === '$') {
				continue;
			}

			if (char === '(') {
				stack.push(this.atNode);
			} else if (char === ')') {
				this.atNode = stack.pop();
			} else if (char === '|') {
				this.atNode = stack[stack.length - 1];
			} else {
				// Move in a direction
				this[char]();
			}
		}
	}

	buildFrontierFrom(from_x, from_y) {
		const from_id = RegexNode.toId(from_x, from_y);

		const frontier = [];
		frontier.push(this.nodes.get(from_id));

		const paths = new Map([[from_id, { cameFrom: null, cost: 0 }]]);
		while (frontier.length > 0) {
			const current = frontier.pop();

			const neighbors = [current.N, current.E, current.S, current.W].filter((v) => v);

			for (let neighbor of neighbors) {
				if (!paths.has(neighbor.id)) {
					frontier.push(neighbor);
					paths.set(neighbor.id, {
						cameFrom: current,
						cost: paths.get(current.id).cost + 1,
					});
				}
			}
		}

		return paths;
	}

	/**
	 * @param {Map<string, {node: RegexNode, char: string}>} optionalPath
	 */
	print(optionalPath) {
		let min_x = Number.MAX_SAFE_INTEGER,
			max_x = Number.MIN_SAFE_INTEGER,
			min_y = Number.MAX_SAFE_INTEGER,
			max_y = Number.MIN_SAFE_INTEGER;

		for (let node of this.nodes.values()) {
			let { x, y } = node.coords;
			if (x > max_x) max_x = x;
			if (x < min_x) min_x = x;
			if (y > max_y) max_y = y;
			if (y < min_y) min_y = y;
		}

		let xd, yd;
		if (min_x < 0) {
			xd = Math.abs(min_x);
			max_x += xd;
			min_x = 0;
		} else if (min_x > 0) {
			xd = -min_x;
			max_x += xd;
			min_x = 0;
		}

		if (min_y < 0) {
			yd = Math.abs(min_y);
			max_y += Math.abs(min_y);
			min_y = 0;
		} else if (min_y > 0) {
			yd = -min_y;
			max_y += yd;
			min_y = 0;
		}

		// Pad `1 + 1` for borders on every side, plus another 1 for 0-index
		// (if `max_y = 9`, we have 10 rows, so need `9 + 3 = 12` rows total for border)
		// Times 2 since we need rows and cols for the doors.
		const rows = Array(max_y * 2 + 3)
			.fill()
			.map((_) => Array(max_x * 2 + 3).fill('#'));

		for (let node of this.nodes.values()) {
			let { x, y } = node.coords;
			let xp = (x + xd) * 2 + 1;
			let yp = (y + yd) * 2 + 1;
			rows[yp][xp] = node.id === '0,0' ? 'X' : '.';

			if (node.N) {
				rows[yp - 1][xp] = '-';
			}
			if (node.S) {
				rows[yp + 1][xp] = '-';
			}
			if (node.W) {
				rows[yp][xp - 1] = '|';
			}
			if (node.E) {
				rows[yp][xp + 1] = '|';
			}
		}

		if (optionalPath) {
			let pathArr = [...optionalPath.values()].reverse();
			for (let i = 0; i < pathArr.length; i++) {
				let { node, char } = pathArr[i];

				let { x, y } = node.coords;
				let xp = (x + xd) * 2 + 1;
				let yp = (y + yd) * 2 + 1;
				let xo = char === '<' ? -1 : char === '>' ? 1 : 0;
				let yo = char === '^' ? -1 : char === 'v' ? 1 : 0;
				rows[yp + yo][xp + xo] = char;

				if (node.id !== '0,0') {
					rows[yp][xp] = char;
				}
			}
		}

		console.log(rows.map((row) => row.join('')).join('\n'));
	}
}

module.exports = {
	RegexMap,
	RegexNode,
};
