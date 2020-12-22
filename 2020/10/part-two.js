const _ = require('lodash');
const { DiGraph } = require('./graph');
const { input } = require('./input');
input.sort((a, b) => a - b);
const adapters = [0, ...input, _.last(input) + 3];

function splitInputOnGapsOfThree(input) {
	/**
	 * @example runs == [[1,2,3], [6,7], [10,11,12,13], ...]
	 */
	let runs = [];
	let current_run = [];
	for (let i = 0; i < input.length; i++) {
		let a = input[i];
		current_run.push(a);

		let b = input[i + 1];
		if (b - a === 3) {
			runs.push(current_run);
			current_run = [];
		}
	}
	runs.push(current_run);

	return runs;
}

let total = splitInputOnGapsOfThree(adapters)
	.map((run) => {
		let g = new DiGraph(run);
		return g.countPaths();
	})
	.reduce((prod, num) => prod * num, 1);
console.log(total);
