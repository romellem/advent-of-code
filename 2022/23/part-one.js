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
// console.log('== Initial State ==\n');
for (let i = 0; i < 10; i++) {
	// console.log(game.grid.toString());
	game.tickRound();
	// console.log(`\n== End of Round ${i + 1} ==\n`);
}
// console.log(game.grid.toString());

game.grid.prune(GROUND);

const gridJSON = game.grid.toJSON();
let count = 0;
for (let y = 0; y < gridJSON.length; y++) {
	for (let x = 0; x < gridJSON[y].length; x++) {
		let cell = gridJSON[y][x];
		if (cell === GROUND) {
			count++;
		}
	}
}
console.log(count);
