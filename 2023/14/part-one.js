const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

const grid = new InfiniteGrid({ load: input });
let roundRocks = grid.findAll('O').sort((a, b) => {
	const aCoords = a.coords;
	const bCoords = b.coords;

	// If y is different, sort by y, top to bottom
	if (aCoords[1] !== bCoords[1]) {
		return aCoords[1] - bCoords[1];
	}

	// Otherwise we are in the same row, sort by x, left to right
	return aCoords[0] - bCoords[0];
});

const EMPTY = '.';

for (let { coords: rockCoords } of roundRocks) {
	let [x, y] = rockCoords;
	while (grid.getNeighbor(x, y, 'N')?.[0] === EMPTY) {
		[x, y] = grid.moveViaSwap(x, y, 'N');
	}
}

const totalLoad = grid
	.findAll('O')
	.map(({ coords }) => {
		return grid.max_y + 1 - coords[1];
	})
	.reduce((a, b) => a + b, 0);

console.log(totalLoad);
