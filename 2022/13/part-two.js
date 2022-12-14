const { input } = require('./input');

const divider2 = [[2]];
const divider6 = [[6]];

// prettier-ignore
const input_all = [
	...input.flat(),
	divider2,
	divider6,
];

compare([[1], [2, 3, 4]], [1, 1, 5, 1, 1]);

function compare(left, right, depth = 0) {
	for (let i = 0; i < Math.max(left.length, right.length); i++) {
		let li = left[i];
		let ri = right[i];

		// console.log('Compare'.padStart(8 + depth), s(li), 'vs', s(ri));

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
			let substep = compare(li, ri, depth + 1);
			if (substep !== null) {
				return substep;
			}
		}

		if (Array.isArray(li) && !Array.isArray(ri)) {
			return compare(li, [ri], depth + 1);
		}

		if (!Array.isArray(li) && Array.isArray(ri)) {
			return compare([li], ri, depth + 1);
		}
	}

	// This (sub)list was neither right nor wrong
	return null;
}

input_all.sort((a, b) => {
	const comparison = compare(a, b);
	if (comparison === true) {
		return -1;
	} else if (comparison === false) {
		return 1;
	} else {
		// console.log('Oops', a, b);
		return 0;
	}
});

// input_all.forEach((l) => console.log(JSON.stringify(l)));
let a = input_all.indexOf(divider2);
let b = input_all.indexOf(divider6);
console.log((a + 1) * (b + 1));
