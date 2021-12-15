const { poly, rules } = require('./input');

/**
 * Count initial pairs
 * e.g. 'ABCABCABC' -> [ AB, BC, CA, AB, BC, CA, AB, BC ] -> { AB: 3, BC: 3, CA: 2 }
 */
let pairs = new Map();
for (let c = 0; c < poly.length - 1; c++) {
	const a = poly[c];
	const b = poly[c + 1];
	const pair = a + b;
	pairs.set(pair, (pairs.get(pair) || 0) + 1);
}

/**
 * Each step, loop through all our pairs and find its matching rule.
 * Take the first char of the pair and append the rule, and take the last char of the pair
 * and prepend the rule. This creates 2 new pairs. Set its count equal to the count of the
 * original paint (plus any previously counted amounts).
 */
const STEPS = 40;
for (let step = 1; step <= STEPS; step++) {
	let new_pairs = new Map();

	for (let [pair, count] of pairs) {
		const rule = rules.get(pair);
		if (rule) {
			// e.g., `pair = 'XY'`, `rule = 'Z'`, `a = XZ`, `b = ZY`
			let a = pair[0] + rule;
			let b = rule + pair[1];

			new_pairs.set(a, count + (new_pairs.get(a) || 0));
			new_pairs.set(b, count + (new_pairs.get(b) || 0));
		} else {
			// Based on our input, this never happens, but theoretically it could
			new_pairs.set(pair, count);
		}
	}

	pairs = new_pairs;
}

// Count invidiual elements within our pairs (this nearly double counts everything, which is OK for now)
const count_totals = {};
for (let [pair, count] of pairs) {
	let a = pair[0];
	let b = pair[1];

	if (!count_totals[a]) count_totals[a] = 0;
	if (!count_totals[b]) count_totals[b] = 0;

	count_totals[a] += count;
	count_totals[b] += count;
}

/**
 * When we split 'ABC" into two pairs, 'AB' and 'BC', we double count that middle 'B'. However, we _don't_
 * double count the starting 'A' and ending 'C'. So add 1 to whatever the first and last letter of our original
 * input was so that all values are double counted. We use the original input because those never change
 * place. The polymer can only grow in the middle, never on the ends.
 */
count_totals[poly[0]]++;
count_totals[poly[poly.length - 1]]++;

/**
 * Finally, divide all element counts by 2 since we counted them twice within the pairs, and sort the list.
 * @example
 *     Let's say our full polymer is:
 *       'ABCDABCDABCD'
 *     We originally split that up into pairs and then counted them:
 *       { AB: 3, BC: 3, CD: 3, DA: 2 }
 *     We then count the individual chars within those pairs, and sum up their counts:
 *       { A: 5, B: 6, C: 6, D: 5 }
 *     The first letter of the original polymer is 'A', so we add 1 to its count. Same for the last letter, 'D':
 *       { A: 6, B: 6, C: 6, D: 6 }
 *     We then divide all counts by 2:
 *       { A: 3, B: 3, C: 3 }
 *     These values match the original counts of the 'ABCDABCDABCD' polymer.
 */
const elements_sorted = Object.entries(count_totals)
	.map(([name, count]) => [name, count / 2])
	.sort((a, b) => a[1] - b[1]);

let min = elements_sorted[0];
let max = elements_sorted[elements_sorted.length - 1];

console.log(max[1] - min[1]);
