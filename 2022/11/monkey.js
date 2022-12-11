let item_name = 'A'.charCodeAt(0);
class Item {
	constructor(worry) {
		// For debugging
		this.name = String.fromCharCode(item_name++);
		this.worry = worry;
	}
}

/**
 * @typedef {Object} MonkeyConfig
 * @property {number} id
 * @property {Array<number>} items
 * @property {(oldWorry: number) => number} worryFn
 * @property {number} divisible_by
 * @property {number} if_true
 * @property {number} if_false
 */

class Monkey {
	/**
	 * @param {MonkeyConfig} config
	 */
	constructor(config) {
		this.id = config.id;
		this.items = config.items.map((v) => new Item(v));
		this.worryFn = config.worryFn;
		this.divisible_by = config.divisible_by;
		this.if_true = config.if_true;
		this.if_false = config.if_false;

		this.inspection_count = 0;
	}
}

class KeepAway {
	/**
	 * @param {Monkey[]} monkeys Order of monkeys should match their `id`
	 */
	constructor(monkeys) {
		this.monkeys = monkeys;
	}

	playRound() {
		for (let monkey of this.monkeys) {
			let { items, divisible_by, if_true, if_false } = monkey;

			monkey.inspection_count += items.length;
			// for (let i = 0; i < items.length; i++) {
			for (let item of items) {
				item.worry = monkey.worryFn(item.worry);
				item.worry = Math.trunc(item.worry / 3);

				let monkey_to_throw_to;

				if (item.worry !== 0 && item.worry % divisible_by === 0) {
					monkey_to_throw_to = this.monkeys[if_true];
				} else {
					monkey_to_throw_to = this.monkeys[if_false];
				}

				monkey_to_throw_to.items.push(item);
			}

			// Empty our items, the monkey threw them all
			items.splice(0, items.length);
		}
	}

	getSortedMonkeys() {
		return [...this.monkeys].sort(
			(monkey_a, monkey_z) => monkey_z.inspection_count - monkey_a.inspection_count
		);
	}
}

module.exports = {
	Item,
	Monkey,
	KeepAway,
};
