const { input } = require('./input');

const nums = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};

function doThing(input) {
	debugger;
	let sum = 0;
	for (let line of input) {
		let origline = line;
		let indices = [];
		do {
			indices = Object.keys(nums)
				.map((n) => [n, line.indexOf(n)])
				.filter((n) => n[1] !== -1)
				.sort((a, b) => a[1] - b[1]);
			for (let [word] of indices) {
				line = line.replace(word, nums[word]);
			}
		} while (indices.length > 0);
		let nums2 = line.split('').filter((v) => /\d/.test(v));
		const val = nums2[0] + nums2[nums2.length - 1];
		console.log(origline, '===\n' + line, '=', nums2.join(''), '=', val);
		console.log();

		sum += +val;
	}
	return sum;
}

const val = doThing(input);

console.log(val);
