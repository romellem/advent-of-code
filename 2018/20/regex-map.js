class Node {
	constructor() {
		this.N = undefined;
		this.S = undefined;
		this.E = undefined;
		this.W = undefined;
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

class Map {
	constructor() {
		this.center = new Node();
	}
}
