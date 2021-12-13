const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');
const { getBasins } = require('./lava');

let grid = new InfiniteGrid({
	// Don't think I need the factory, but just in case
	defaultFactory: () => 9,
	load: input,
});

// Basins are sorted, largest to smallest
let basins = getBasins(grid);

// Take the top three largest basins
let [a, b, c] = basins;

console.log(a.size * b.size * c.size);
