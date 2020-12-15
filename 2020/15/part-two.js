const { input } = require('./input');

const said = {};
let c = 0;
for (let num of input) {
	said[num] = [++c];
}
said[0].push(++c);
let last_num_spoken = 0;
for (let i = input.length + 1; i < 30000000; i++) {
	i % 1000 === 0 && process.stdout.write(i + '\r');
	let turn = i + 1;
	if (said[last_num_spoken].length > 1) {
		let [before_that, most_recent] = said[last_num_spoken];
		let diff = Math.abs(most_recent - before_that);
		if (!said[diff]) said[diff] = [];
		said[diff].push(turn);
		if (said[diff].length > 2) said[diff].shift();
		last_num_spoken = diff;

		if (i === 30000000 - 1) console.log('\n===\n', diff);
	} else {
		said[0].push(turn);
		if (said[0].length > 2) said[0].shift();
		last_num_spoken = 0;
		if (i === 30000000 - 1) console.log('\n===\n', 0);
	}
}
