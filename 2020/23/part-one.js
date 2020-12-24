const { input } = require('./input');
const { LoopedList } = require('looped-list');

var list = new LoopedList(input.slice(0));
for (let i = 0; i < 100; i++) {
	let current_cup = list.head.value;
	list.move();
	let a = list.popHeadMoveNext().value;
	let b = list.popHeadMoveNext().value;
	let c = list.popHeadMoveNext().value;
	list.move(-1);

	let length = list.length();
	let scale = 1;
	let found = false;
	do {
		for (let j = 0; j < length *2; j++) {
			list.move();
			let newval = current_cup - scale;
			if (newval < 1) newval = 9;
			if (list.head.value === newval) {
				found = true;
				break;
			}
		}

		if (!found) scale++;
	} while (!found);

	list.insertNext(a);
	list.insertNext(b);
	list.insertNext(c);
	
	
	let l = list.length();
	for (let j = 0; j < l; j++) {
		if (list.head.value === current_cup) {
			break;
		}
		list.move();
	}
	list.move();
}

console.log([...list]);
