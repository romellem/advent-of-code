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

class Item {
	constructor(worry) {
		// For debugging
		this.name = item_gen.next().value.join('');
		this.worry = worry;
		this.worryPrimes = new Set(primeFactors(worry));
	}

	reduceWorryToPrimeFactors() {
		console.log(`Finding prime factors of ${this.worry.toLocaleString()}`);
		console.time('prime');
		if (!cache.has(this.worry)) {
			let composition = primeFactors(this.worry);
			cache.set(
				this.worry,
				[...new Set(composition)].reduce((a, b) => a * b, 1)
			);
		}
		this.worry = cache.get(this.worry);

		console.timeEnd('prime');
	}
}

/**
 * @typedef {Object} MonkeyConfig
 * @property {number} id
 * @property {Array<number>} items
 * @property {(oldWorry: number) => number} worryFn
 * @property {(oldWorryPrimes: Set<number>) => Set<number>} worryFnOpt
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
		this.worryFnOpt = config.worryFnOpt;
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
	constructor(monkeys, part_one = true) {
		this.monkeys = monkeys;
		this.part_one = part_one;
	}

	playRound() {
		for (let monkey of this.monkeys) {
			let { items, divisible_by, if_true, if_false } = monkey;

			monkey.inspection_count += items.length;

			for (let item of items) {
				let monkey_to_throw_to;

				if (this.part_one) {
					item.worry = monkey.worryFn(item.worry);
					item.worry = Math.trunc(item.worry / 3);

					if (item.worry !== 0 && item.worry % divisible_by === 0) {
						monkey_to_throw_to = this.monkeys[if_true];
					} else {
						monkey_to_throw_to = this.monkeys[if_false];
					}
				} else {
					// Part two
					monkey.worryFnOpt(item.worryPrimes);

					if (item.worryPrimes.has(divisible_by)) {
						monkey_to_throw_to = this.monkeys[if_true];
					} else {
						monkey_to_throw_to = this.monkeys[if_false];
					}
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
