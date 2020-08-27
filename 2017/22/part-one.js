const { input } = require('./input');
const { GridComputingCluster, INFECTED } = require('./grid');

let grid = new GridComputingCluster();
grid.parseInput(input);

const STEPS = 10000;
const ONE_PERCENT = STEPS / 100;
for (let i = 0; i < STEPS; i++) {
	if (i % ONE_PERCENT === 0) {
		process.stdout.write(`${Math.round((i / STEPS) * 100)}%   \r`);
	}

	grid.burst();
}

console.log('=========================');
console.log(grid.count[INFECTED]);
