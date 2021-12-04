const { input } = require('./input');

let oxy = [...input];
let co2 = [...input];

function getMinsMaxes(lines) {
	let count = {};

	for (let line of lines) {
		for (let i = 0; i < line.length; i++) {
			if (!count[i]) {
				// Initialize [zeros_count, ones_count]
				count[i] = [0, 0];
			}

			let val = +line[i];
			count[i][val]++;
		}
	}

	let mins = [];
	let maxs = [];
	for (let counts of Object.values(count)) {
		if (counts[0] === counts[1]) {
			maxs.push(null);
			mins.push(null);
		} else if (counts[0] > counts[1]) {
			maxs.push('0');
			mins.push('1');
		} else {
			maxs.push('1');
			mins.push('0');
		}
	}

	return {
		min: mins,
		max: maxs,
	};
}

let bit = 0;
while (oxy.length > 1) {
	let { max } = getMinsMaxes(oxy);
	oxy = oxy.filter((num) => {
		return max[bit] === null ? num[bit] === '1' : num[bit] === max[bit];
	});

	bit++;
}

const oxy_rating = parseInt(oxy[0], 2);

bit = 0;
while (co2.length > 1) {
	let { min } = getMinsMaxes(co2);
	co2 = co2.filter((num) => {
		return min[bit] === null ? num[bit] === '0' : num[bit] === min[bit];
	});
	bit++;
}

const co2_rating = parseInt(co2[0], 2);

console.log(oxy_rating * co2_rating);
