const G = require('generatorics');
const item_gen = G.baseNAll('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

/**
 * @see https://rosettacode.org/wiki/Prime_decomposition#JavaScript
 * @license GFDL-1.2
 */
function primeFactors(n) {
	if (!n || n < 2) return [];

	var f = [];
	for (var i = 2; i <= n; i++) {
		while (n % i === 0) {
			f.push(i);
			n /= i;
		}
	}

	return f;
}

// let cache = new Map();

class Item {
	constructor(worry) {
		// For debugging
		this.name = item_gen.next().value.join('');
		this.worry = worry;
	}

	reduceWorryToPrimeFactors() {
		let composition = primeFactors(this.worry);
		this.worry = [...new Set(composition)].reduce((a, b) => a * b, 1);
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
	constructor(monkeys, lower_worry_level = true) {
		this.monkeys = monkeys;
		this.lower_worry_level = lower_worry_level;
	}

	playRound() {
		for (let monkey of this.monkeys) {
			let { items, divisible_by, if_true, if_false } = monkey;

			monkey.inspection_count += items.length;

			for (let item of items) {
				item.worry = monkey.worryFn(item.worry);

				if (this.lower_worry_level) {
					item.worry = Math.trunc(item.worry / 3);
				}

				item.reduceWorryToPrimeFactors();

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
