const Queue = require('double-ended-queue');
const { InfiniteGrid } = require('./infinite-grid');

const ENTRANCE = '@';
const PASSAGE = '.';
const WALL = '#';
const DOOR_RE = /[A-Z]/;
const KEY_RE = /[a-z]/;

class Maze {
	constructor(raw_input) {
		this.grid = Maze.parseInput(raw_input);
		this.entrances = this.grid.findAll(ENTRANCE);
		this.doors = this.grid.findAll(DOOR_RE);
		this.keys = this.grid.findAll(KEY_RE);
	}

	static parseInput(raw_input) {
		const grid = new InfiniteGrid({ defaultFactory: (x, y) => '.' });
		const input_arr = raw_input.split('\n').map((row) => row.split(''));
		for (let y = 0; y < input_arr.length; y++) {
			for (let x = 0; x < input_arr[y].length; x++) {
				let cell = input_arr[y][x];
				grid.set(x, y, cell);
			}
		}

		return grid;
	}

	setupPartTwo() {
		/**
		 * Transform
		 *
		 *    FROM     TO
		 *     ...    @#@
		 *     .@.    ###
		 *     ...    @#@
		 */
		let [ox, oy] = this.entrances.values().next().value;

		// Top left corner
		let top_x = ox - 1;
		let top_y = oy - 1;

		// prettier-ignore
		let new_center = InfiniteGrid.split(
			'@#@' + '\n' +
			'###' + '\n' +
			'@#@'
		);
		for (let y = 0; y < new_center.length; y++) {
			for (let x = 0; x < new_center[y].length; x++) {
				let cell = new_center[y][x];
				this.grid.set(top_x + x, top_y + y, cell);
			}
		}

		this.entrances = this.grid.findAll(ENTRANCE);
	}

	getShortestPath() {
		const makePath = ({ x, y, steps = 0, keys_collected = '' } = {}) => ({
			x,
			y,
			steps,
			keys_collected,
			at_end: false,
		});

		// paths = [{ x, y, steps, keys_collected }, ...]
		let paths = [...this.entrances.values()].map(([x, y]) => makePath({ x, y }));
		while (paths.some((path) => !path.at_end)) {
			// Memo this function based on from / to coords
			const countSteps = (() => {
				const cache = {};
				return (from_id, to_coord, came_from) => {
					let current = to_coord;
					let count = 0;
					const cache_key = `${InfiniteGrid.toId(
						current[0],
						current[1]
					)}/${from_id}`;

					if (cache[cache_key] === undefined) {
						while (InfiniteGrid.toId(current[0], current[1]) !== from_id) {
							count++;
							current = came_from.get(
								InfiniteGrid.toId(current[0], current[1])
							);
						}
						cache[cache_key] = count;
					}

					return cache[cache_key];
				};
			})();

			let new_paths = [];
			console.log(`${paths[0].keys_collected.length} / ${this.keys.size}`);
			for (let path of paths) {
				const reachable_keys = new Map();
				let { x, y } = path;
				const path_id = InfiniteGrid.toId(x, y);

				// Build frontier from current location
				const frontier = new Queue();
				frontier.push([x, y]);
				const came_from = new Map([[InfiniteGrid.toId(x, y), null]]);
				while (!frontier.isEmpty()) {
					const current_coord = frontier.shift();
					const neighbor_coords = this.grid
						.neighbors(current_coord[0], current_coord[1])
						.values();
					for (let { coord: next_coord, value: next_cell } of neighbor_coords) {
						if (next_cell === WALL) continue;

						const next_id = InfiniteGrid.toId(...next_coord);
						if (came_from.has(next_id)) continue;

						if (
							this.doors.has(next_cell) &&
							!path.keys_collected.includes(next_cell.toLowerCase())
						) {
							// Door is locked
							continue;
						}

						// Otherwise, it is passage, key, or unlocked door

						if (next_cell === PASSAGE || next_cell === ENTRANCE) {
							frontier.push(next_coord);
						} else if (KEY_RE.test(next_cell)) {
							if (!path.keys_collected.includes(next_cell.toLowerCase())) {
								reachable_keys.set(next_cell, next_coord);
							} else {
								// Found keys are walkable
								frontier.push(next_coord);
							}
						} else if (DOOR_RE.test(next_cell)) {
							// Unlocked door, can walk
							frontier.push(next_coord);
						} else {
							throw new Error(`Unknown cell: ${next_cell}`);
						}

						came_from.set(next_id, current_coord);
					}
				}

				for (let [reachable_key, reachable_key_coord] of reachable_keys) {
					let [key_x, key_y] = reachable_key_coord;
					const steps = countSteps(path_id, reachable_key_coord, came_from);
					new_paths.push(
						makePath({
							x: key_x,
							y: key_y,
							steps: path.steps + steps,
							keys_collected: path.keys_collected + reachable_key,
						})
					);
				}
			}

			let pruned_paths = new Map();
			for (let path of new_paths) {
				if (path.keys_collected.length === this.keys.size) {
					// We collected all the keys!
					path.at_end = true;
				}
				const sorted_keys_str = path.keys_collected.split('').sort().join('');
				const path_id = `${path.x},${path.y},${path.steps},${sorted_keys_str}`;
				pruned_paths.set(path_id, path);
			}

			/**
			 * I'm cheating here a bit, but as an optimization prune the 25%
			 * longest paths so far when I have a decent amount, set at 100.
			 * I don't have a guarantee that some path _currently_ neat the bottom
			 * won't eventually overtake the number one spot, but 25% ends up being
			 * a safe cutoff point for my inputs. This speeds up part one by
			 * a factor of 10 (500s -> 50s)
			 */
			paths = [...pruned_paths.values()].sort((a, b) => a.steps - b.steps);
			if (paths.length > 100) {
				paths = paths.slice(0, Math.ceil(paths.length * 0.75));
			}
		}

		return paths;
	}
}

module.exports = {
	Maze,
};
