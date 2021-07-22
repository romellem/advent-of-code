const Queue = require('double-ended-queue');
const { InfiniteGrid } = require('./infinite-grid');

const ENTRANCE = '@';
const PASSAGE = '.';
const WALL = '#';
const DOOR_RE = /[A-Z]/;
const KEY_RE = /[a-z]/;

function* queueIterator(queue) {
	let i = 0;
	let value = queue.get(i);
	while (value !== undefined) {
		yield value;
		value = queue.get(++i);
	}
}

class Maze {
	constructor(raw_input) {
		this.grid = Maze.parseInput(raw_input);
		this.entrances = this.grid.findAll(ENTRANCE);
		this.doors = this.grid.findAll(DOOR_RE);
		this.keys = this.grid.findAll(KEY_RE);

		for (let [x, y] of this.entrances.values()) {
			this.grid.set(x, y, PASSAGE);
		}
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

	getShortestPath(_x, _y) {
		const makePath = ({ x, y, steps = 0, keys_collected = '' } = {}) => ({
			x,
			y,
			steps,
			keys_collected,
			at_end: false,
		});

		const countSteps = (from_coord, to_coord, came_from) => {
			let current = to_coord;
			let count = 0;
			const from_id = InfiniteGrid.toId(...from_coord);
			while (InfiniteGrid.toId(...current) !== from_id) {
				count++;
				current = came_from.get(InfiniteGrid.toId(...current));
			}
			return count;
		};

		// paths = [{ x, y, steps, keys_collected }, ...]
		let paths = [makePath({ x: _x, y: _y })];
		while (paths.some((path) => !path.at_end)) {
			let new_paths = [];
			for (let path of paths) {
				const reachable_keys = new Map();
				let { x, y } = path;

				// Build frontier from current location
				const frontier = new Queue([x, y]);
				const came_from = new Map([InfiniteGrid.toId(x, y), null]);
				while (!frontier.isEmpty()) {
					const current_coord = frontier.shift();
					for (let next_coord of this.grid
						.neighbors(...current_coord)
						.values()) {
						const next_id = InfiniteGrid.toId(...next_coord);
						const next_cell = this.grid.get(...next_coord);
						if (next_cell === WALL) continue;
						if (
							this.doors.has(next_cell) &&
							remaining_keys.has(next_cell.toLowerCase())
						) {
							// Door is locked
							continue;
						}

						// Otherwise, it is passage, key, or unlocked door
						if (!came_from.has(next_id)) {
							// We haven't visited this one yet
							if (next_cell === PASSAGE || next_cell === ENTRANCE) {
								frontier.push(next_coord);
							} else if (KEY_RE.test(next_cell)) {
								reachable_keys.set(next_cell, next_coord);
							} else if (DOOR_RE.test(next_cell)) {
								frontier.push(next_coord);
							} else {
								throw new Error(`Unknown cell: ${next_cell}`);
							}

							came_from.set(next_id, current_coord);
						}
					}
				}

				if (path.keys_collected.length === this.keys.size) {
					// We collected all the keys!
					path.at_end = true;
				}
				for (let [reachable_key, reachable_key_coord] of reachable_keys) {
					let [key_x, key_y] = reachable_key_coord;
					const steps = countSteps([x, y], reachable_key_coord, came_from);
					new_paths.push(
						makePath({
							x: key_x,
							y: key_y,
							steps,
							keys_collected: path.keys_collected + reachable_key,
						})
					);
				}
			}

			paths = new_paths;
		}
	}
}

module.exports = {
	Maze,
};