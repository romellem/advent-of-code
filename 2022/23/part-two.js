const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');
const { PlantSteps, ELF, GROUND } = require('./plant-steps');

const grid = new InfiniteGrid({
	load: input,
	defaultFactory: () => GROUND,
	parseAs: (cell) => (cell === '#' ? ELF : GROUND),
	string_map: { [GROUND]: '.', [ELF]: '#' },
});

const game = new PlantSteps(grid);

/**
 * This runs fairly slow, around ~8s, because I don't have a good mechanism to just loop
 * over the ELF cells in each tick, instead I loop over all cells and only operate on
 * the ELF ones.
 */
const rounds = game.run({ pruneEveryNRounds: 0 });
console.log(rounds);
