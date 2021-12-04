const { input } = require('./input');

let nums = JSON.parse(JSON.stringify(input));
let nums2 = JSON.parse(JSON.stringify(input));

function getMinsMaxes(lines, low_or_high) {
	let count = {};

	for (let line of lines) {
		for (let i = 0; i < line.length; i++) {
			if (!count[i]) count[i] = [0, 0];
			let val = +line[i];
			count[i][val]++;
		}
	}

	let mins = [];
	let maxs = [];
	for (let [p, counts] of Object.entries(count)) {
		if (counts[0] === counts[1]) {
			maxs.push(null);
			mins.push(null);
		} else if (counts[0] > counts[1]) {
			maxs.push(0);
			mins.push(1);
		} else {
			maxs.push(1);
			mins.push(0);
		}
	}

	return {
		min: mins.map(v => '' + v),
		max: maxs.map(v => '' + v),
	}
}

let bit = 0;
while (nums.length > 1) {
	console.log(bit);
	let {min, max} = getMinsMaxes(nums);
	nums = nums.filter((num) => {
		return max[bit] === 'null' ? num[bit] === '1' : num[bit] === max[bit]
	});
	bit++;
}

let a = parseInt(nums[0].join(''), 2);

bit = 0;
while (nums2.length > 1) {
	console.log(bit);
	let {min, max} = getMinsMaxes(nums2);
	nums2 = nums2.filter((num) => {
		return min[bit] === 'null' ? num[bit] === '0' : num[bit] === min[bit]
	});
	bit++;
}

let b = parseInt(nums2[0].join(''), 2);

console.log(a*b)
