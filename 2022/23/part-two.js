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
const rounds = game.run({ pruneEveryNRounds: 0 });
console.log(rounds);
