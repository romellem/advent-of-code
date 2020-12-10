const { input } = require('./input');
const s = [
    // 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19
    // 1,4,7,8,9,12,14,16
    // 1,4,5,6,9,12,13,14,15,18
    // 1,4,7,10,12,14,16
    // 1
    1,2,5,6,7,8,9

];

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

	_print(node, acc = '', groups) {
		acc += node.val + ',';
		if (!node.children.length) {
			this.total++;
            let lines = acc.slice(0, -1).split(',').map((v, i, a) => i === a.length - 1 ? '' : `${v} --> ${a[i+1]}`);
            lines.pop(); // last one is empty
            groups.push(lines);
		} else {
			for (let c of node.children) {
				this._print(c, acc, groups);
			}
		}
	}

	print() {
        this.total = 0;
        let groups = [];
        this._print(this.head, '', groups);
        // let i = 0;
        let sts = groups.reduce((styles, lines) => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
			lines.forEach((line, j) => {
				styles.push(`linkStyle ${styles.length} stroke-width:2px,stroke:#${randomColor},fill:none;`);
            });
            return styles;
        }, []).join('\n')
        console.log(groups.flat().join('\n'));
        console.log(sts);
		return this.total;
	}
}

// let r = reduceInput(s);
// r.shift();
// console.log(r)
let g = new Graph(s);
console.log(g.print());