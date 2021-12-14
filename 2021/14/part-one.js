const { poly, rules } = require('./input');

class Element {
	constructor(name) {
		this.name = name;
		this.next = null;
	}

	toString() {
		return this.name;
	}
}

const list = poly.split('').map((v) => new Element(v));

for (let i = 0; i < 10; i++) {
	for (let j = 0; j < list.length - 1; j++) {
		let a = list[j];
		let b = list[j + 1];

		let pair = '' + a + b;
		console.log(pair);
		process.exit();

		if (rules.has(pair)) {
			a.next = new Element(rules.get(pair));
		}
	}
}
