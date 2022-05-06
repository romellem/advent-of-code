class RegexNode {
	constructor(x, y) {
		this.id = RegexNode.toId(`${x},${y}`);
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
				stack.pop();
				this.atNode = stack[stack.length - 1];
			} else if (char === '|') {
				this.atNode = stack[stack.length - 1];
			} else {
				// Move in a direction
				this[char]();
			}
		}
	}

	print() {
		let min_x = Number.MAX_SAFE_INTEGER,
			max_x = Number.MIN_SAFE_INTEGER,
			min_y = Number.MAX_SAFE_INTEGER,
			max_y = Number.MIN_SAFE_INTEGER;

		for (let node of this.nodes) {
			let { x, y } = node.coords;
			if (x > max_x) max_x = x;
			if (x < min_x) min_x = x;
			if (y > max_y) max_y = y;
			if (y < min_y) min_y = y;
		}

		if (min_x < 0) {
			max_x += Math.abs(min_x);
			min_x = 0;
		} else if (min_x > 0) {
			max_x -= Math.abs(min_x);
			min_x = 0;
		}

		if (min_y < 0) {
			max_y += Math.abs(min_y);
			min_y = 0;
		} else if (min_y > 0) {
			max_y -= Math.abs(min_y);
			min_y = 0;
		}

		const rows = Array(max_y)
			.fill()
			.map((_) => Array(max_x).fill('#'));

		console.log(rows.map((row) => row.join('')).join('\n'));
	}
}

module.exports = {
	RegexMap,
	RegexNode,
};
