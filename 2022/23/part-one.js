const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

let debug = 'A'.charCodeAt(0);
let debugs = [];
const pushAndReturnVal = (val) => {
	debugs.push(val);
	return val;
};

const ELF = 1;
const GROUND = 0;
const grid = new InfiniteGrid({
	load: input,
	defaultFactory: () => GROUND,
	parseAs: (cell) => (cell === '#' ? pushAndReturnVal(debug++) : GROUND),
});
grid.string_map = {
	[GROUND]: '.',
	...debugs.reduce((obj, v) => ((obj[v] = String.fromCharCode(v)), obj), {}),
};

function neighborsMapIsEmpty(map) {
	for (let { value } of map.values()) {
		if (value) {
			return false;
		}
	}

	return true;
}

class PlantSteps {
	/**
	 * @param {InfiniteGrid} grid
	 */
	constructor(grid) {
		this.grid = grid;

		// 1. If there is no Elf in the N, NE, or NW adjacent positions, the Elf proposes moving north one step.
		// 2. If there is no Elf in the S, SE, or SW adjacent positions, the Elf proposes moving south one step.
		// 3. If there is no Elf in the W, NW, or SW adjacent positions, the Elf proposes moving west one step.
		// 4. If there is no Elf in the E, NE, or SE adjacent positions, the Elf proposes moving east one step.
		this.proposals = [
			{ check: ['N', 'NE', 'NW'], moveInDir: 'N' },
			{ check: ['S', 'SE', 'SW'], moveInDir: 'S' },
			{ check: ['W', 'NW', 'SW'], moveInDir: 'W' },
			{ check: ['E', 'NE', 'SE'], moveInDir: 'E' },
		];
		this.round = 0;
	}

	tickRound() {
		// `null` values mean two elves tried to move to the same spot
		const elf_movement_destinations = new Map();
		for (let [id, cell] of this.grid) {
			if (cell === GROUND) {
				continue;
			}

			const coord = InfiniteGrid.toCoords(id);
			const elf_neighbors = this.grid.neighbors(...coord, true);

			if (!neighborsMapIsEmpty(elf_neighbors)) {
				for (let proposal of this.proposals) {
					const proposal_elves_size = proposal.check.reduce((neighborSum, dir) => {
						const dir_value = elf_neighbors.get(dir)?.value || GROUND;
						return neighborSum + dir_value;
					}, 0);

					if (!proposal_elves_size) {
						// Try to move in this dir
						const dest_coord = InfiniteGrid.moveInDirection(
							...coord,
							proposal.moveInDir
						);
						const dest_id = InfiniteGrid.toId(...dest_coord);
						const already_taken = elf_movement_destinations.get(dest_id);

						if (already_taken === undefined) {
							// Not taken, place our elf there!
							elf_movement_destinations.set(dest_id, coord);
						} else {
							// We already tried to move there, so null it out so noone moves there
							elf_movement_destinations.set(dest_id, null);
						}
					}
				}
			}
		}

		// 2nd half, move the elves
		for (let [dest_id, origin_coord] of elf_movement_destinations) {
			if (origin_coord === null) {
				continue;
			}
			const elf_char = this.grid.get(...origin_coord);
			this.grid.set(...InfiniteGrid.toCoords(dest_id), elf_char);
			this.grid.set(...origin_coord, GROUND);
		}

		let first = this.proposals.shift();
		this.proposals.push(first);
	}
}

const game = new PlantSteps(grid);
for (let i = 0; i < 10; i++) {
	// console.log(game.grid.toString());
	game.tickRound();
	// console.log(`\n== End of Round ${i + 1} ==\n`);
}

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
console.log(count); // 2851 too low, 2856 too low, 4339 too high

/*
......#.....
..........#.
.#.#..#.....
.....#......
..#.....#..#
#......##...
....##......
.#........#.
...#.#..#...
............
...#..#..#..
*/

/*
.......A.....
..F.B.....E..
.............
.......D...H.
.LI.CN.......
.........G...
.......O.J..K
.....M.......
..P.Q.....S..
......R.V..T.
....U........
*/
