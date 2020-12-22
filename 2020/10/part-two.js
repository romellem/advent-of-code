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

	/**
	 * Convert our runs of _absolute_ values to _relative_ values.
	 * That is, the first digit should be a 0, followed by whatever
	 * increments separate the terms.
	 */
	const relative_runs = runs.map((run, i) => {
		const [first_term] = run;
		const relative_run = run.map((v) => v - first_term);
		return relative_run;
	});
	return relative_runs;
}

let total = splitInputOnGapsOfThree(adapters)
	.map((run) => {
		let g = new DiGraph(run);
		return g.countPaths();
	})
	.reduce((prod, num) => prod * num, 1);
console.log(total);
