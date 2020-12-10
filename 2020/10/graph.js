class TreeNode {
	constructor(val) {
		this.val = val;
		this.firstChild = undefined;
		this.nextSibling = undefined;
	}
}

class Graph {
	constructor(input) {
		this.input = input.slice(0);
		this.input.sort((a, b) => a - b);
		this.head = new TreeNode(0);
		this.build(this.head);
	}

	build(node) {
		let current_node = node;
		for (let num of this.input) {
			let a = new TreeNode(num);
			current_node.firstChild = a;
		}
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
