class RegexNode {
	constructor(x, y) {
		this.id = `${x},${y}`;
		this.coord = { x, y };

		this.N = undefined;
		this.S = undefined;
		this.E = undefined;
		this.W = undefined;
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
		this.center = new RegexNode(0, 0);
	}

	connect(from, to, dir) {
		from.connect(to, dir);
	}

	build(path) {
		let origins = [{ x: 0, y: 0 }];
		let stack = [];
		let nodes = new Map();
		nodes.set(this.center.id, this.center);

		for (let char of path) {
			if (char === '^' || char === '$') {
				continue;
			}

			for (let origin of origins) {
				if (char === '(') {
					stack.push(atNode);
					origins.push(atNode);
					break;
				} else if (char === ')') {
					atNode = stack.pop();
				} else if (char === '|') {
					atNode = stack[stack.length - 1];
				} else {
					// Move in a direction
				}
			}
		}
	}
}
