const { input } = require('./input');
const newinput = input.concat(Array(1000000 - 9).fill().map((v, i) => i + 10));

class LoopedListItem {
	constructor(value, is_first = false) {
		this.value = value;

		// Pointers to other LoopedListItems
		this.next_item;
		this.prev_item;

		// Set next and prev to itself
		if (is_first) {
			this.next_item = this;
			this.prev_item = this;
		}
	}

	next(n = 1) {
		let current = this;
		do {
			current = current.next_item;
		} while (--n);
		return current;
	}

	prev(n = 1) {
		let current = this;
		do {
			current = current.prev_item;
		} while (--n);
		return current;
	}

	insertNext(item) {
		this.next_item.prev_item = item;
		item.next_item = this.next_item;

		this.next_item = item;
		item.prev_item = this;

		return item;
	}

	insertPrev(item) {
		this.prev_item.next_item = item;
		item.next_item = this;

		item.prev_item = this.prev_item;
		this.prev_item = item;

		return item;
	}

	removeSelf() {
		this.next_item.prev_item = this.prev_item;
		this.prev_item.next_item = this.next_item;

		return this;
	}
}
class LoopedList {
	constructor(value) {
		// Keep head unset if we didn't pass in a value
		this.head = undefined;

		if (Array.isArray(value) && value.length) {
			/**
			 * When an array is passed, use the first value as the `head`,
			 * and loop through other values and insert them.
			 */
			let intial_value = value[0];

			// This sets `this.head`
			this.init(intial_value);

			if (value.length) {
				// Loop through remaining values
				for (let i = 1; i < value.length; i++) {
					this.insertNext(value[i]);
				}

				// Move forward one tick to reset head back to `intial_value`
				this.move(1);
			}
		} else if (typeof value !== 'undefined') {
			// This sets `this.head`
			this.init(value);
		}
	}

	init(value) {
		if (!(value instanceof LoopedListItem)) {
			value = new LoopedListItem(value, true);
		}
		this.head = value;

		return this;
	}

	move(steps = 1) {
		// Steps can be negative to move backwards
		let direction = steps > 0 ? 'next' : 'prev';

		steps = Math.abs(steps);
		this.head = this.head[direction](steps);

		return this;
	}

	insertNext(item) {
		if (!(item instanceof LoopedListItem)) {
			item = new LoopedListItem(item);
		}
		this.head = this.head.insertNext(item);

		return this;
	}

	insertPrev(item) {
		if (!(item instanceof LoopedListItem)) {
			item = new LoopedListItem(item);
		}
		this.head = this.head.insertPrev(item);

		return this;
	}

	popHeadMoveNext() {
		let next_item = this.head.next_item;
		let old_head = this.head.removeSelf();
		this.head = next_item;

		return old_head;
	}

	popHeadMovePrev() {
		let prev_item = this.head.prev_item;
		let old_head = this.head.removeSelf();
		this.head = prev_item;

		return old_head;
	}

	length() {
		let head = this.head;
		this.move(1);

		let length = 1;

		while (this.head !== head) {
			length++;
			this.move(1);
		}

		return length;
	}
}
var list = new LoopedList(newinput);

let lookup = Array(1000001);
for (let i = 0; i < 1000000; i++) {
	lookup[list.head.value] = list.head;
	list.move();
}


for (let i = 0; i < 10000000; i++) {
	i %100 === 0 && process.stdout.write(i/10000000*100+ '%\r')
	let current_cup = list.head.value;
	list.move();
	let a = list.popHeadMoveNext().value;
	let b = list.popHeadMoveNext().value;
	let c = list.popHeadMoveNext().value;
	list.move(-1);


	let newval = current_cup - 1;
	if (newval < 1) newval = 1000000;
	while (a === newval || b === newval || c === newval) {
		newval--;
	}

	list.head = lookup[newval];

	list.insertNext(a);
	list.insertNext(b);
	list.insertNext(c);
	
	
	list.head = lookup[current_cup];
	list.move();
}

list.head = lookup[1];
list.move();

let a = list.head.value;
list.move();
let b= list.head.value;

console.log(a, b)
console.log(a* b)