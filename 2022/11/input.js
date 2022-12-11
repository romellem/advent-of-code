const path = require('path');
const fs = require('fs');

let cache = require('./cache.json');
function appendToCache(num, factors) {
	let contents = fs.readFileSync(path.join(__dirname, 'cache.json'), 'utf8');
	let json = JSON.parse(contents);
	json[num] = factors;
	Object.assign(cache, json);
	fs.writeFileSync(path.join(__dirname, 'cache.json'), JSON.stringify(json, null, '  '));
}

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

				// Part two, smarter parsing
				let [, left, op, right] = /Operation: new = (\w+) ([\+\*]) (\w+)$/.exec(line);
				let worryFnOpt;
				if (left === 'old' && right === 'old') {
					worryFnOpt = (oldSet) => oldSet;
				} else if (op === '*') {
					right = parseInt(right, 10);
					worryFnOpt = (oldSet) => oldSet.add(right);
				} else if (op === '+') {
					right = parseInt(right, 10);
					worryFnOpt = (oldSet) => {
						let num = [...oldSet].reduce((a, b) => a * b, 1);
						num += right;
						process.stdout.write('Finding primes of ' + num + ' ... ');
						console.time('prime');
						let primes;
						if (cache[num]) {
							primes = cache[num];
						} else {
							primes = primeFactors(num);
							appendToCache(num, primes);
						}
						console.timeEnd('prime');
						oldSet.clear();
						for (let p of primes) {
							oldSet.add(p);
						}
						return oldSet;
					};
				} else {
					throw new Error(`Invalid line: ${line}`);
				}

				acc.worryFnOpt = worryFnOpt;
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
