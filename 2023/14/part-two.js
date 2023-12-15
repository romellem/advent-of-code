const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

// Getting fancy / terse here, see part one for a more reasonable way to write these
const sortTopToBottomLeftToRight = ({ coords: ac }, { coords: bc }) => ac[1] !== bc[1] ? ac[1] - bc[1] : ac[0] - bc[0];
const sortBottomToTopLeftToRight = ({ coords: ac }, { coords: bc }) => ac[1] !== bc[1] ? bc[1] - ac[1] : ac[0] - bc[0];
const sortLeftToRightToptoBottom = ({ coords: ac }, { coords: bc }) => ac[0] !== bc[0] ? ac[0] - bc[0] : ac[1] - bc[1];
const sortRightToLeftToptoBottom = ({ coords: ac }, { coords: bc }) => ac[0] !== bc[0] ? bc[0] - ac[0] : ac[1] - bc[1];

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
let cycle = 0;

const seenGrids = new Set();

function runCycle() {
	cycle++;
	for (let [dir, sortFn] of spinCycles) {
		roundRocks.sort(sortFn);

		for (let rock of roundRocks) {
			let [x, y] = rock.coords;
			while (grid.getNeighbor(x, y, dir)?.[0] === EMPTY) {
				// Update x values without updating `rock` (just yet)
				[x, y] = grid.moveViaSwap(x, y, dir);
			}

			// Update our coord reference so we don't have to continuously grab it from the `grid`
			rock.coords[0] = x;
			rock.coords[1] = y;
		}
	}

	const gridStr = grid.toString();

	if (seenGrids.has(gridStr)) {
		foundCycle = true;
	} else {
		seenGrids.add(gridStr);
	}
}

while (!foundCycle) {
	runCycle();
}

// Cycles are cyclic but in some period - determine the period now that we've seen a previous state (have entered a stable period somewhere)
const periodicStates = [];
do {
	periodicStates.push(grid.toString());
	runCycle();
} while (!periodicStates.includes(grid.toString()));

console.log(periodicStates.length);
console.log(cycle);
console.log();

const cyclesLeft = (1000000000 - cycle) % periodicStates.length;

for (let i = 0; i < cyclesLeft; i++) {
	runCycle();
}

const totalLoad = grid
	.findAll('O')
	.map(({ coords }) => {
		return grid.max_y + 1 - coords[1];
	})
	.reduce((a, b) => a + b, 0);

console.log(totalLoad);
