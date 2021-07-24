const Queue = require('double-ended-queue');
const { InfiniteGrid } = require('./infinite-grid');

const ENTRANCE = '@';
const PASSAGE = '.';
const WALL = '#';
const DOOR_RE = /[A-Z]/;
const KEY_RE = /[a-z]/;

// Works for our input
const cloneJSON = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * @typedef {[Number, Number]} Coord
 */

class Maze {
	constructor(raw_input, auto_create_pathfinders = true) {
		this.grid = Maze.parseInput(raw_input);
		this.entrances = this.grid.findAll(ENTRANCE);
		this.doors = this.grid.findAll(DOOR_RE);
		this.keys = this.grid.findAll(KEY_RE);

		// By keys_collected, then by from/to
		this.count_cache = {};

		if (auto_create_pathfinders) {
			this.pathfinders = this.generatePathfinders();
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

	setupPartTwo() {
		/**
		 * Transform
		 *
		 *    FROM     TO
		 *     ...    @#@
		 *     .@.    ###
		 *     ...    @#@
		 */
		let [ox, oy] = this.entrances[0][1];

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

	/**
	 * I am being paranoid and only memoizing by adding an extra caching
	 * layer by keys_collected, just in case new paths open up as new doors
	 * get unlocked.
	 */
	countSteps(from_id, to_coord, keys_collected) {
		let current = to_coord;
		let count = 0;
		if (!this.count_cache[keys_collected]) {
			this.count_cache[keys_collected] = {};
		}
		const came_from = this.pathfinders.get(from_id);
		const cache_key = `${InfiniteGrid.toId(...current)}/${from_id}`;
		if (this.count_cache[keys_collected][cache_key] === undefined) {
			while (InfiniteGrid.toId(...current) !== from_id) {
				count++;
				current = came_from.get(InfiniteGrid.toId(...current));
			}
			this.count_cache[keys_collected][cache_key] = count;
		}

		return this.count_cache[keys_collected][cache_key];
	}

	getReachableKeys(from_id, keys_collected) {
		const reachable_keys = new Map();
		for (let [key, key_coord] of this.keys) {
			const key_id = InfiniteGrid.toId(...key_coord);
			if (from_id === key_id || keys_collected.includes(key)) {
				// Don't say the current key or other keys collected are reachable
				continue;
			}

			let current = key_coord;
			const came_from = this.pathfinders.get(from_id);

			while (InfiniteGrid.toId(...current) !== from_id) {
				current = came_from.get(InfiniteGrid.toId(...current));

				if (!current) {
					// Key is in another quadrant
					break;
				}

				// Check if new cell is walkable
				const cell = this.grid.get(...current);
				const is_locked_door =
					Boolean(this.doors.find(([door]) => door === cell)) &&
					!keys_collected.includes(cell.toLowerCase());
				const is_uncollected_key =
					KEY_RE.test(cell) && !keys_collected.includes(cell);

				if (is_locked_door || is_uncollected_key) {
					break;
				}

				// Otherwise it _has_ to be a passage, collected key, or entrance
				const assert_walkable =
					cell === PASSAGE ||
					cell === ENTRANCE ||
					KEY_RE.test(cell) ||
					(DOOR_RE.test(cell) && keys_collected.includes(cell.toLowerCase()));
				if (!assert_walkable) {
					throw new Error(
						`Unknown cell: ${cell}, keys_collected: ${keys_collected}`
					);
				}
			}

			if (current && InfiniteGrid.toId(...current) === from_id) {
				// This key is reachable!
				reachable_keys.set(key, cloneJSON(key_coord));
			}
		}

		return reachable_keys;
	}

	getShortestPath() {
		const entrances_coords = this.entrances.map(([, coord]) => coord);

		let paths = [
			{
				keys_collected: '',
				at_end: false,
				steps: 0,
				// [[x1, y1], [x2, y2], ...]
				robots_coords: cloneJSON(entrances_coords),
			},
		];
		while (paths.some((path) => !path.at_end)) {
			let new_paths = [];

			console.log(
				`${paths[0].keys_collected.length} / ${this.keys.length} (${paths.length} paths)`
			);
			for (let path of paths) {
				/** @type Array<Map<String, Coord> */
				const reachable_keys_by_robots = path.robots_coords.map(([x, y]) => {
					return this.getReachableKeys(
						InfiniteGrid.toId(x, y),
						path.keys_collected
					);
				});

				for (let r = 0; r < reachable_keys_by_robots.length; r++) {
					let [from_x, from_y] = path.robots_coords[r];
					const from_id = InfiniteGrid.toId(from_x, from_y);
					let reachable_keys = reachable_keys_by_robots[r];
					for (let [reachable_key, reachable_key_coord] of reachable_keys) {
						let [key_x, key_y] = reachable_key_coord;
						const steps = this.countSteps(
							from_id,
							reachable_key_coord,
							path.keys_collected
						);
						const new_robots_coords = cloneJSON(path.robots_coords);
						new_robots_coords[r][0] = key_x;
						new_robots_coords[r][1] = key_y;
						new_paths.push({
							keys_collected: path.keys_collected + reachable_key,
							at_end: false,
							steps: path.steps + steps,
							robots_coords: new_robots_coords,
						});
					}
				}
			}

			/**
			 * If we have identical robot positions, steps, and keys collected,
			 * consider those paths as duplicates and prune them.
			 */
			let pruned_paths = new Map();
			for (let path of new_paths) {
				if (path.keys_collected.length === this.keys.length) {
					// We collected all the keys!
					path.at_end = true;
				}
				const sorted_keys_str = path.keys_collected.split('').sort().join('');
				const path_id = `${JSON.stringify(path.robots_coords)};${
					path.steps
				};${sorted_keys_str}`;
				pruned_paths.set(path_id, path);
			}

			paths = [...pruned_paths.values()].sort((a, b) => a.steps - b.steps);
		}

		return paths;
	}

	generatePathfinders() {
		const pathfinders = new Map();
		for (let iter of [this.entrances, this.keys]) {
			for (let [, coord] of iter) {
				const [x, y] = coord;
				const frontier = new Queue();
				frontier.push([x, y]);
				const came_from = new Map([[InfiniteGrid.toId(x, y), null]]);
				while (!frontier.isEmpty()) {
					const current_coord = frontier.shift();
					const neighbor_coords = this.grid
						.neighbors(...current_coord)
						.values();
					for (let { coord: next_coord, value: next_cell } of neighbor_coords) {
						if (next_cell === WALL) continue;

						const next_id = InfiniteGrid.toId(...next_coord);
						if (came_from.has(next_id)) continue;

						// Coord is walkable
						const is_walkable =
							next_cell === PASSAGE ||
							next_cell === ENTRANCE ||
							KEY_RE.test(next_cell) ||
							DOOR_RE.test(next_cell);

						if (is_walkable) {
							frontier.push(next_coord);
						} else {
							throw new Error(`Unknown cell: ${next_cell}`);
						}

						came_from.set(next_id, current_coord);
					}
				}

				pathfinders.set(InfiniteGrid.toId(x, y), came_from);
			}
		}

		return pathfinders;
	}
}

module.exports = {
	Maze,
};
