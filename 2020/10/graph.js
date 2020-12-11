// class Node {
// 	constructor(val, index) {
// 		this.val = val;
// 		this.index = index;
// 		this.children = [];
// 	}

// 	tryToAddChildren(children, base) {
// 		for (let i = 0; i < children.length; i++) {
// 			let c = children[i];
// 			if (c - this.val <= 3 && c > this.val) {
// 				this.children.push(new Node(c, base + i + 1));
// 			}
// 		}
// 	}
// }

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

class ListNode {
	constructor(value, index) {
		this.value = value;
		this.index = index;
		this.next = undefined;
	}
}

class LinkedList {
	constructor(head) {
		this.head = head;
		this.last = head;
	}

	add(list_node) {
		if (!(list_node instanceof ListNode)) {
			list_node = new ListNode(list_node);
		}
		if (!this.head) {
			this.head = list_node;
		} else {
			this.last.next = list_node;
		}
		this.last = list_node;
		return this.last;
	}

	tail() {
		return this.last && this.last.value;
	}

	toString() {
		let acc = '';
		let node = this.head;
		while (node) {
			acc += !acc ? node.value : `,${node.value}`;
			node = node.next;
		}
		return acc;
	}

	*[Symbol.iterator]() {
		let node = this.head;
		while (node) {
			yield node;
			node = node.next;
		}
	}
}

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
		let max = items[items.length - 1] + 3;
		this.items = [0, ...items, max].map((v, i) => new Node(v, i));
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

	asMermaid() {
		for (let i = 0; i < this.items.length; i++) {
			
		}
	}

	countPathsUtil(u, d, pathCount) {
		// If current vertex is same as
		// destination, then increment count
		if (u === d) {
			pathCount++;
			pathCount % 10000000 === 0 && process.stdout.write(pathCount.toLocaleString() + '\r')
		}

		// Recur for all the vertices
		// adjacent to this vertex
		else {
			let node = this.items[u];
			for (let connection of node.connections) {
				pathCount = this.countPathsUtil(connection.index, d, pathCount);
			}
			
		}
		return pathCount;
	}

	countPaths() {
		let pathCount = this.countPathsUtil(0, this.items.length - 1, 0);
		return pathCount;
	}
}

module.exports = { Node, Graph, DiGraph, LinkedList, ListNode };
