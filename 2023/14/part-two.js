const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');
const { C } = require('generatorics');

// Getting fancy here, see part one for a more reasonable way to write these
// prettier-ignore
const sortTopToBottomLeftToRight = ({ coords: ac }, { coords: bc }) => ac[1] !== bc[1] ? ac[1] - bc[1] : ac[0] - bc[0],
	sortBottomToTopLeftToRight = ({ coords: ac }, { coords: bc }) => ac[1] !== bc[1] ? bc[1] - ac[1] : ac[0] - bc[0],
	sortLeftToRightToptoBottom = ({ coords: ac }, { coords: bc }) => ac[0] !== bc[0] ? ac[0] - bc[0] : ac[1] - bc[1],
	sortRightToLeftToptoBottom = ({ coords: ac }, { coords: bc }) => ac[0] !== bc[0] ? bc[0] - ac[0] : ac[1] - bc[1];

const spinCycles = [
	['N', sortTopToBottomLeftToRight],
	['W', sortLeftToRightToptoBottom],
	['S', sortBottomToTopLeftToRight],
	['E', sortRightToLeftToptoBottom],
];

const EMPTY = '.';
const grid = new InfiniteGrid({ load: input });

const roundRocks = grid.findAll('O');

let foundCycle = false;
let iteration = 0;

const seenGrids = new Set();

function runCycle() {
	const [dir, sortFn] = spinCycles[iteration++ % 4];
	roundRocks.sort(sortFn);

	for (let rock of roundRocks) {
		let [x, y] = rock.coords;
		while (grid.getNeighbor(x, y, dir)?.[0] === EMPTY) {
			[x, y] = grid.moveViaSwap(x, y, dir);
		}
		rock.coords[0] = x;
		rock.coords[1] = y;
	}

	if (seenGrids.has(grid.toString())) {
		foundCycle = true;
	} else {
		seenGrids.add(grid.toString());
	}
}

while (!foundCycle) {
	runCycle();
}

while (iteration + 4 < 1000000000) {
	iteration += 4;
}

console.log(iteration);
for (let i = 0; i < 1000000000 - iteration; i++) {
	runCycle();
}

console.log(
	grid
		.findAll('O')
		.map(({ coords }) => {
			return grid.max_y + 1 - coords[1];
		})
		.reduce((a, b) => a + b, 0)
);

// 107942 too high
