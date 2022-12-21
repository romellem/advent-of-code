const { input } = require('./input');

const divider2 = [[2]];
const divider6 = [[6]];

// Turn this on to see logs
const debug = false;

// prettier-ignore
const input_all = [
	...input.flat(),
	divider2,
	divider6,
];

function compare(left, right, depth = 0, debug = false) {
	if (depth === 0 && debug) {
		console.log('========');
	}

	for (let i = 0; i < Math.max(left.length, right.length); i++) {
		let li = left[i];
		let ri = right[i];

		if (debug) {
			console.log(
				'Compare'.padStart(7 + depth * 2),
				JSON.stringify(li),
				'vs',
				JSON.stringify(ri)
			);
		}

		if (li === undefined) {
			return true;
		} else if (ri === undefined) {
			return false;
		}

		if (typeof li === 'number' && typeof ri === 'number') {
			if (li < ri) {
				return true;
			} else if (li > ri) {
				return false;
			} else {
				// Same num, continue checking next val
				continue;
			}
		}

		if (Array.isArray(li) && Array.isArray(ri)) {
			let substep = compare(li, ri, depth + 1, debug);
			if (substep !== null) {
				return substep;
			}
		} else if (Array.isArray(li) && !Array.isArray(ri)) {
			if (debug) {
				console.log(
					' '.repeat(depth * 2) +
						`Mixed types; convert right to [${ri}] and retry comparison`
				);
			}

			let substep = compare(li, [ri], depth + 1, debug);
			if (substep !== null) {
				return substep;
			}
		} else if (!Array.isArray(li) && Array.isArray(ri)) {
			if (debug) {
				console.log(
					' '.repeat(depth * 2) +
						`Mixed types; convert left to [${li}] and retry comparison`
				);
			}

			let substep = compare([li], ri, depth + 1, debug);
			if (substep !== null) {
				return substep;
			}
		}
	}

	// This (sub)list was neither right nor wrong
	return null;
}

input_all.sort((a, b) => {
	const comparison = compare(a, b, undefined, debug);
	if (comparison === true) {
		return -1;
	} else if (comparison === false) {
		return 1;
	} else {
		return 0;
	}
});

if (debug) {
	console.log('Sorted list:');
	input_all.forEach((l) => console.log(JSON.stringify(l)));
}

let a = input_all.indexOf(divider2);
let b = input_all.indexOf(divider6);
console.log((a + 1) * (b + 1));
