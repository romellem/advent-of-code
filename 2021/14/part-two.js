const { poly, rules } = require('./input');

class Element {
	constructor(name) {
		this.name = name;
		this.next = null;
		this.dead = false;
	}

	toString() {
		return this.name;
	}

	reset() {
		this.next = null;
	}
}

let list = poly.split('').map((v) => new Element(v));

let count = {};
for (let i = 0; i < 40; i++) {
	console.log(list.length);
	for (let j = 0; j < list.length - 1; j++) {
		let a = list[j];
		if (a.dead) {
			list.splice(j + 1, 1);
		}
		let b = list[j + 1];

		let pair = '' + a + b;

		if (rules.has(pair)) {
			a.next = new Element(rules.get(pair));
		}
	}

	let new_list = [];
	for (let j = 0; j < list.length; j++) {
		let a = list[j];
		let b = list[j + 1];
		if (b) {
			if (!a.next && !b.next) {
				new_list.push(a);
				a.dead = true;
				count[b.name] = (count[b.name] || 0) + 1;
			} else {
				new_list.push(a);
				if (a.next) {
					new_list.push(a.next);
					a.reset();
				}
			}
		} else {
			new_list.push(a);
			if (a.next) {
				new_list.push(a.next);
				a.reset();
			}
		}
	}

	list = new_list;
}

// console.log(count);
// process.exit(0);

let obj = list.reduce((obj, item) => {
	obj[item.name] = (obj[item.name] || 0) + 1;
	return obj;
}, {});

// console.log(obj);
// process.exit(0);

for (let [name, x] of Object.entries(count)) {
	obj[name] = (obj[name] || 0) + x;
}

let things = Object.entries(obj);
things.sort((a, b) => a[1] - b[1]);

let min = things[0];
let max = things[things.length - 1];

console.log('max', max);
console.log('min', min);

console.log(max[1] - min[1]);
