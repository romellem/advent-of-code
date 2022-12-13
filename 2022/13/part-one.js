const { input } = require('./input');

function compare(left, right, i = 0) {
	while (true) {
		let li = left[i];
		let ri = right[i];
		if (li === undefined || ri === undefined) {
			return false;
		}

		if (typeof li === 'number' && typeof ri !== 'number') {
			return compare([li], ri, i);
		} else if (typeof ri === 'number' && typeof li !== 'number') {
			return compare(li, [ri], i);
		}

		if (typeof li !== 'number' && typeof ri !== 'number') {
			return compare(li, ri, 0);
		}

		if (typeof li === 'number' && typeof ri === 'number') {
		}
	}
}
// for (let [left, right] of input) {
// 	let l_item, r_item;
// 	let
// 	do {

// 	} while (l_item !== undefined || r_item !== undefined)

// }
