const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n')
	.map((text_block) => {
		const lines = text_block.split('\n');
		/**
		 * @example
		 * Monkey 0:
		 *   Starting items: 57, 58
		 *   Operation: new = old * 19
		 *   Test: divisible by 7
		 *     If true: throw to monkey 2
		 *     If false: throw to monkey 3
		 */
		const monkey = lines.reduce((acc, line, i) => {
			line = line.trim();
			if (i === 0) {
				let [, id] = /Monkey (\d+):/.exec(line);
				id = parseInt(id, 10);
				acc.id = id;
			} else if (i === 1) {
				let [, items] = /Starting items: (.+)$/.exec(line);
				items = items.split(', ').map((v) => parseInt(v, 10));
				acc.items = items;
			} else if (i === 2) {
				let [, fn_str] = /Operation: new = (.+)$/.exec(line);
				const worryFn = (old) => {
					const scope = { old };
					let result;
					// The uncomon `with` statement!
					with (scope) {
						result = eval(fn_str);
					}
					return result;
				};
				acc.worryFn = worryFn;
			} else if (i === 3) {
				let [, divisible_by] = /Test: divisible by (\d+)/.exec(line);
				divisible_by = parseInt(divisible_by, 10);
				acc.divisible_by = divisible_by;
			} else if (i === 4) {
				let [, if_true] = /If true: throw to monkey (\d+)$/.exec(line);
				if_true = parseInt(if_true, 10);
				acc.if_true = if_true;
			} else if (i === 5) {
				let [, if_false] = /If false: throw to monkey (\d+)$/.exec(line);
				if_false = parseInt(if_false, 10);
				acc.if_false = if_false;
			}

			return acc;
		}, {});

		return monkey;
	});

module.exports = {
	input,
};
