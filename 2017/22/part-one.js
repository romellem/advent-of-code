const { input } = require('./input');
const { GridComputingCluster } = require('./grid');

let grid = new GridComputingCluster();
grid.parseInput(input);

for (let i = 0; i < 10000; i++) {
	grid.burst();
}

console.log(grid.infected);
