class Node {
	constructor(val, index) {
		this.val = val;
		this.index = index;
		this.children = [];
	}

	tryToAddChildren(children, base) {
		for (let i = 0; i < children.length; i++) {
			let c = children[i];
			if (c - this.val <= 3 && c > this.val) {
				this.children.push(new Node(c, base + i + 1));
			}
		}
	}
}

class Graph {
	constructor(input) {
		this.input = input.slice(0);
		this.input.sort((a, b) => a - b);
		this.head = new Node(0, 0);
		this.build(this.head, 0, []);
	}

	build(node, index, iters) {
		// do {
			let slice = this.input.slice(index, index + 3);
			node.tryToAddChildren(slice, index);
			for (let child of node.children) {
				this.build(child, child.index, iters);
			}
		// } while (iters.length);
		// for (fn of iters) {
		// 	fn();
		// }
	}

	_print(node, acc = '') {
		acc += node.val + ', ';
		if (!node.children.length) {
			this.total++;
			console.log(acc);
		} else {
			for (let c of node.children) {
				this._print(c, acc);
			}
		}
	}

	print() {
		this.total = 0;
		this._print(this.head);
		return this.total;
	}
}

module.exports = { Node, Graph };
