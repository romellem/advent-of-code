const { poly, rules } = require('./input');

class Element {
	constructor(name) {
		this.name = name;
		this.next = null;
	}

	toString() {
		return this.name;
	}

	reset() {
		this.next = null;
	}
}

let list = poly.split('').map((v) => new Element(v));

for (let i = 0; i < 10; i++) {
	for (let j = 0; j < list.length - 1; j++) {
		let a = list[j];
		let b = list[j + 1];

		let pair = '' + a + b;

		if (rules.has(pair)) {
			a.next = new Element(rules.get(pair));
		}
	}

	let new_list = [];
	for (let j = 0; j < list.length; j++) {
		let a = list[j];
		new_list.push(a);

		if (a.next) {
			new_list.push(a.next);
			a.reset();
		}
	}

	list = new_list;
}

let obj = list.reduce((obj, item) => {
	obj[item.name] = (obj[item.name] || 0) + 1;
	return obj;
}, {});

let things = Object.entries(obj);
things.sort((a, b) => a[1] - b[1]);

let min = things[0];
let max = things[things.length - 1];

console.log('min:', min);
console.log('max:', max);
console.log(max[1] - min[1]);
