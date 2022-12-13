const { input } = require('./input');

const s = (v) => JSON.stringify(v);

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

let correct = [];
for (let i = 0; i < input.length; i++) {
	let [left, right] = input[i];
	// console.log(`\n== Pair ${i + 1} ==`);
	let result = compare(left, right);
	if (result === true) {
		correct.push(i + 1);
	} else if (result === null) {
		console.log('oops', i, JSON.stringify(left), JSON.stringify(right));
	} else {
		// console.log('yeah');
	}
}
console.log(correct.reduce((a, b) => a + b, 0));
