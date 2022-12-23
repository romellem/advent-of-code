const { input } = require('./input');
const { InfiniteGrid } = require('./infinite-grid');

const ELF = 1;
const GROUND = 0;
const grid = new InfiniteGrid({
	load: input,
	defaultFactory: () => GROUND,
	parseAs: (cell) => (cell === '#' ? ELF : GROUND),
	string_map: { [GROUND]: '.', [ELF]: '#' },
});

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
			{ check: ['N', 'NE', 'NW'], move: 'N' },
			{ check: ['S', 'SE', 'SW'], move: 'S' },
			{ check: ['W', 'NW', 'SW'], move: 'W' },
			{ check: ['E', 'NE', 'SE'], move: 'E' },
		];
		this.round = 0;
	}

	tickRound() {
		for (let [id, cell] of this.grid) {
			if (cell === GROUND) {
				continue;
			}

			const elf_neighbors = new Map(
				[...this.grid.neighbors(...InfiniteGrid.toCoords(id), true)].filter(
					([, { value }]) => value
				)
			);

			if (elf_neighbors.size) {
				for (let i = 0; i < this.proposals.length; i++) {
					const index = (i + this.round) % this.proposals.length;
					const proposal = this.proposals[index];
					const proposal_elves = proposal.check.map((dir) => elf_neighbors.get(dir));
				}
			}
		}

		this.round++;
		this.round %= this.proposals.length;
	}
}
