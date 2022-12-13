const { input } = require('./input');

function compare(left, right) {
	for (let i = 0; i < Math.max(left.length, right.length); i++) {
		let li = left[i];
		let ri = right[i];

		if (li === undefined) {
			return true;
		} else if (ri === undefined) {
			return false;
		}

		if (typeof li === 'number' && typeof ri === 'number') {
			if (li < ri) {
				return true;
			} else if (ri > li) {
				return false;
			} else {
				// Same num, continue checking next val
				continue;
			}
		}

		if (Array.isArray(li) && Array.isArray(ri)) {
			let substep = compare(li, ri);
			if (substep !== null) {
				return substep;
			}
		}

		if (Array.isArray(li) && !Array.isArray(ri)) {
			return compare(li, [ri]);
		}

		if (!Array.isArray(li) && Array.isArray(ri)) {
			return compare([li], ri);
		}
	}

	// This (sub)list was neither right nor wrong
	return null;
}

let sums = 0;
for (let [left, right] of input) {
	let result = compare(left, right);
	if (result === true) {
		sums += [left, right].flat(Infinity).reduce((a, b) => a + b, 0);
	} else if (result === null) {
		console.log('oops', left, right);
	}
}
console.log(sums);
