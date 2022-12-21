const { input } = require('./input');

function compare(left, right, depth = 0) {
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
	let result = compare(left, right);
	if (result === true) {
		correct.push(i + 1);
	} else if (result === null) {
		throw new Error(`Failed to compare:\n${JSON.stringify(left)}\n${JSON.stringify(right)}`);
	}
}

console.log(correct.reduce((a, b) => a + b, 0));
