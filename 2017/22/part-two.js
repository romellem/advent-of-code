const { sampleInput, input } = require('./input');
const { EvolvedGridComputingCluster } = require('./grid');

let grid = new EvolvedGridComputingCluster();
grid.parseInput(input);

const STEPS = 10000000;
for (let i = 0; i < STEPS; i++) {
	if (i % 10007 === 0) {
		process.stdout.write(`${Math.round((i / STEPS) * 100)}%   \r`);
	}

	grid.burst();
}

console.log('=========================');
console.log(grid.infected);

