const { input } = require('./input');
// const input = [1,2,3]

const said = {};
let c = 0;
for (let num of input) {
	said[num] = [++c];
}
said[0].push(++c);
let last_num_spoken = 0;
for (let i = input.length + 1; i < 2020; i++) {
	let turn = i + 1;
	if (said[last_num_spoken].length > 1) {
		let [before_that, most_recent] = said[last_num_spoken];
		let diff = Math.abs(most_recent - before_that);
		if (!said[diff]) said[diff] = [];
		said[diff].push(turn);
		if (said[diff].length > 2) said[diff].shift();
		last_num_spoken = diff;

		if (i === 2019) console.log(diff);
	} else {
		said[0].push(turn);
		if (said[0].length > 2) said[0].shift();
		last_num_spoken = 0;
		if (i === 2019) console.log(0);
	}
}
