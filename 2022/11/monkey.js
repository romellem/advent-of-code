const G = require('generatorics');
const item_gen = G.baseNAll('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

class Item {
	constructor(worry) {
		// For debugging
		this.name = item_gen.next().value.join('');
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
	constructor(monkeys, is_part_one = true) {
		this.monkeys = monkeys;
		this.is_part_one = is_part_one;

		// Numbers are prime, so this happens to be the LCM (least common multiple) among the numbers
		this.all_divisors = monkeys.map((monkey) => monkey.divisible_by).reduce((a, b) => a * b, 1);
	}

	playRound() {
		for (let monkey of this.monkeys) {
			let { items, divisible_by, if_true, if_false } = monkey;

			monkey.inspection_count += items.length;

			for (let item of items) {
				item.worry = monkey.worryFn(item.worry);

				if (this.is_part_one) {
					item.worry = Math.trunc(item.worry / 3);
				} else {
					/**
					 * Modular arithmetic is hard to wrap your head around sometimes, but I think
					 * this all makes sense. Lets take some number `b` and see the remainder when
					 * we divide it by `n`. Let's call the remainder `a`. Well, that's the modulus
					 * operator, so `b % n = a`, or `a = b % n`.
					 *
					 * Let's pretend that if I did plugged numbers into `b` and `n` and I got a value
					 * of `a` that was greater than 0, how would I change `b` to get a value of 0
					 * for `a`? Of course, just subtract whatever that original value of `a` is - e.g
					 * the remainder - and `n` would be able to evenly divide `b`! In other words,
					 * `b - a = k*n` for some whole number `k`.
					 *
					 * OK, so that last part, if `b - a = k*n`, then that is a "congruence relation."
					 * Written another way, `a ≡ b (mod n)` is read as "`a` and `b` are congruent
					 * modulo `n`."
					 *
					 * What are some things we know if we have that congruence relation? Let's use
					 * some real numbers. `32 % 31 = 1`, or `1 ≡ 32 (mod 31)` (32 divided by 31 has a
					 * remainder of 1).
					 *
					 * Is it always true that `a ≡ a (mod n)`? Yep! This especially makes sense if
					 * `a` is less than `n`. So using the above numbers, `32 % 31 = 1`, so I know
					 * `1 ≡ 32 (mod 31)` and `1 ≡ 1 (mod 31)`.
					 *
					 * What if we didn't have 32, what if we had 33? Well, `33 % 31 = 2`.
					 * That is, `(32 + 1) % 31 = (1 + 1)`. So you can "add" to both sides.
					 *
					 * What about multiplication? Let's take `32 * 3 = 96`. Well `96 % 31 = 3`, or
					 * `(32 * 3) % 31 = (1 * 3)`. So we can multiply both sides (by whole numbers).
					 *
					 * Finally, what if we scale our modulus? `(32 * 2) % (31 * 2) = (1 * 2)`, so
					 * that also works!
					 *
					 * To recap:
					 *
					 * - `a ≡ a (mod n)`
					 * - `a + k ≡ b + k (mod n)`
					 * - `a * k ≡ b * k (mod n)`
					 * - `a * k ≡ b * k (mod n * k)`
					 *
					 * OK, awesome, so what does that have to do with our problem? Wait, what is the
					 * problem we are having?
					 *
					 * Well, the `worry` level of our items gets too large. Before, we divided
					 * by 3 each turn, so that kept the numbers reasonable. So how can we check
					 * that our worry level is divisible by some number `n` without storing
					 * the whole large number?
					 *
					 * Remember, we are trying to check that `0 ≡ b (mod n)` (`n` divides `b`).
					 * So rather save the full number `b`, how can we reduce it without losing
					 * the useful information?
					 *
					 * Well, we know that `a ≡ a (mod n)`, so rather than save our full value of `b`,
					 * just save the remainder! Addition and multiplication is totally fine if we don't
					 * have the original value of `b` because the congruence relation doesn't change.
					 *
					 * OK, that's great, but we don't want to check just one value of `b`, we'll
					 * need to check _several_ values that might divide our "worry" level.
					 *
					 * And this is the whole trick: you can multiply the divisors together and our equivalence
					 * relation doesn't change! Let's say `D` is the product our all our divisors.
					 * If `0 ≡ b (mod n)`, then `0 * D = b * D (mod n * D)`.
					 */
					item.worry = item.worry % this.all_divisors;
				}

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
