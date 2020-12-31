const { input } = require('./input');
const { LoopedList } = require('looped-list');

// `Math.max(...arr)` throws a RangeError when too many arguments are passed.
const findMax = (arr) => {
	let max = Number.MIN_SAFE_INTEGER;
	for (let v of arr) {
		if (v > max) {
			max = v;
		}
	}
	return max;
};

const list = new LoopedList(input.slice(0));
const MAX_VALUE = findMax(input);

for (let i = 0; i < 100; i++) {
	let current_cup_item = list.head;
	let current_cup = list.head.value;

	list.move(1);
	let a = list.popHeadMoveNext().value;
	let b = list.popHeadMoveNext().value;
	let c = list.popHeadMoveNext().value;
	list.move(-1);

	let next_cup = current_cup - 1;
	let next_cup_item = list.find(next_cup);

	while (!next_cup_item) {
		next_cup--;
		if (next_cup < 1) {
			next_cup = MAX_VALUE;
		}
		next_cup_item = list.find(next_cup);
	}

	list.setHead(next_cup_item);

	list.insertNext(a);
	list.insertNext(b);
	list.insertNext(c);

	list.setHead(current_cup_item);
	list.move(1);
	console.log([...list.values()]);
}

console.log([...list.values()]);
