const { input } = require('./input');

class LoopedListItem {
	constructor(value, is_first = false) {
		this.value = value;

		// Pointers to other LoopedListItems
		this.next_item;
		this.prev_item;

		// Set next and prev to itself
		if (is_first) {
			this.next_item = this;
			this.prev = this;
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
			let intial_value = value.shift();

			// This sets `this.head`
			this.init(intial_value);

			if (value.length) {
				// Loop through remaining values
				for (let i = 0; i < value.length; i++) {
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
var list = new LoopedList(input.slice(0));
for (let i = 0; i < 100; i++) {
	console.log(i)
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

console.log(listToArray())
function listToArray() {
	let ar = [];
	while (list.length() > 1) {
		// console.log(ar);
		ar.push(list.popHeadMoveNext().value);
	}
	ar.push(list.head.value);
	return ar;
}
