const { inputPartTwo } = require('./input');
const { LoopedList } = require('looped-list');

const list = new LoopedList(inputPartTwo);

const LIST_LENGTH = inputPartTwo.length;
const MOVES = 10000000;

let lookup = Array(LIST_LENGTH + 1);
for (let item of list.items()) {
	lookup[item.value] = item;
}

for (let i = 0; i < MOVES; i++) {
	let current_cup = list.head.value;
	list.move();
	let a = list.popHeadMoveNext();
	let b = list.popHeadMoveNext();
	let c = list.popHeadMoveNext();

	let next_cup = current_cup - 1;
	if (next_cup < 1) next_cup = LIST_LENGTH;
	while (a.value === next_cup || b.value === next_cup || c.value === next_cup) {
		next_cup--;
	}

	list.setHead(lookup[next_cup]);

	list.insertNext(a);
	list.insertNext(b);
	list.insertNext(c);

	list.setHead(lookup[current_cup]);
	list.move();
}

let a = lookup[1].next(1).value;
let b = lookup[1].next(2).value;

console.log(`${a} * ${b}`, '=', a * b);
