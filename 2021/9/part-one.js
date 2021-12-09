const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');
const { getLowPoints } = require('./lava');

let grid = new InfiniteGrid({
	// Don't think I need the factory, but just in case
	defaultFactory: () => 9,
	load: input,
});

let lows = getLowPoints(grid);

// The *risk level* of a low point is 1 plus its height
let risk_level = lows.reduce((sum, { cell }) => sum + (cell + 1), 0);

console.log(risk_level);
