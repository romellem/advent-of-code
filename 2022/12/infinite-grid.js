const Heap = require('heap');

/**
 * @typedef {String} GridId - Two numbers separated by a comma.
 * @example "10,5"
 */

/**
 * @typedef {Object} InfiniteGridConstructorOptions
 * @property {?Function<x, y>} defaultFactory - Defaults to returning 0 for new coords
 * @property {?Object} string_map - Map grid values to strings.
 * @property {?String|any[][]} load - Initial grid to load. Can be a "2D" string (string with new lines), or a "2D" array.
 * @property {?Function<v>} parseAs - When `load` is defined, this parses the cell in the split string. Defaults to `String`.
 */

class InfiniteGrid {
	/**
	 * @param {InfiniteGridConstructorOptions} options
	 */
	constructor({ defaultFactory = (x, y) => 0, string_map = {}, load: loadStr, parseAs } = {}) {
		this.defaultFactory = defaultFactory.bind(this);
		this.string_map = string_map;
		this.grid = new Map();
		this.max_x = -Infinity;
		this.min_x = Infinity;
		this.max_y = -Infinity;
		this.min_y = Infinity;

		if (loadStr) {
			this.load(loadStr, parseAs);
		}
	}

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {GridId}
	 */
	static toId(x, y) {
		return `${x},${y}`;
	}

	/**
	 * @param {GridId} id
	 * @param {Boolean} [return_as_object=false]
	 * @returns {{x: Number, y: Number} | [Number, Number]}
	 */
	static toCoords(id, return_as_object = false) {
		let [x, y] = id.split(',');
		x = parseInt(x, 10);
		y = parseInt(y, 10);
		return return_as_object ? { x, y } : [x, y];
	}

	/**
	 * @param {String} two_dimensional_string
	 * @returns {any[][]}
	 */
	static split(two_dimensional_string) {
		return two_dimensional_string.split('\n').map((row) => row.split(''));
	}

	static moveInDirection(x, y, direction) {
		switch (direction) {
			case 'N':
				return [x, y - 1];
			case 'W':
				return [x - 1, y];
			case 'E':
				return [x + 1, y];
			case 'S':
				return [x, y + 1];
			case 'NW':
				return [x - 1, y - 1];
			case 'NE':
				return [x + 1, y - 1];
			case 'SW':
				return [x - 1, y + 1];
			case 'SE':
				return [x + 1, y + 1];
			default:
				throw new Error(
					'Invalid direction for moveInDirection. Valid directions are N, W, E, S, NW, NE, SW, SE'
				);
		}
	}

	reset() {
		this.grid = new Map();
		this.max_x = -Infinity;
		this.min_x = Infinity;
		this.max_y = -Infinity;
		this.min_y = Infinity;
		return this;
	}

	/**
	 * @param {String|any[][]} input
	 */
	load(input, parseAs = String) {
		this.reset();
		let grid = input;
		if (typeof input === 'string') {
			grid = InfiniteGrid.split(input);
		}

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				this.set(x, y, parseAs(grid[y][x]));
			}
		}
	}

	getRow(x, y, include_self = false) {
		const self_id = InfiniteGrid.toId(x, y);
		let cell_ids = Array(Math.abs(this.max_x - this.min_x) + 1)
			.fill()
			.map((_, i) => InfiniteGrid.toId(this.min_x + i, y));

		if (!include_self) {
			cell_ids = cell_ids.filter((id) => id !== self_id);
		}

		return cell_ids.map((id) => this.grid.get(id));
	}

	getCol(x, y, include_self = false) {
		const self_id = InfiniteGrid.toId(x, y);
		let cell_ids = Array(Math.abs(this.max_y - this.min_y) + 1)
			.fill()
			.map((_, i) => InfiniteGrid.toId(x, this.min_y + i));

		if (!include_self) {
			cell_ids = cell_ids.filter((id) => id !== self_id);
		}

		return cell_ids.map((id) => this.grid.get(id));
	}

	/**
	 * @todo The "wrap around" only really makes sense in a rectangular grid.
	 * Try to code in the cases where we have some cols/rows that are larger than others.
	 */
	getNeighbor(x, y, direction, { wrap_around = false } = {}) {
		if (!this.inBounds(x, y)) {
			return;
		}

		const coord = InfiniteGrid.moveInDirection(x, y, direction);
		const [new_x, new_y] = coord;

		if (this.inBounds(new_x, new_y)) {
			return [this.get(new_x, new_y), coord];
		} else if (wrap_around) {
			if (this.inBounds(new_x) && !this.inBounds(undefined, new_y)) {
				if (direction === 'N') {
					// Wrap to bottom
					return [this.get(new_x, this.max_y), [new_x, this.max_y]];
				} else {
					// Wrap to top
					return [this.get(new_x, this.min_y), [new_x, this.min_y]];
				}
			} else if (!this.inBounds(new_x) && this.inBounds(undefined, new_y)) {
				if (direction === 'E') {
					// Wrap to left
					return [this.get(this.min_x, new_y), [this.min_x, new_y]];
				} else {
					// Wrap to right
					return [this.get(this.max_x, new_y), [this.max_x, new_y]];
				}
			}
		}
	}

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Boolean} [diagonals=false]
	 * @returns {Map} Return a map with optional keys N, W, E, S (and NW, NE, SW, SE if `diagonals` is true) if those neighbors are within the bounds of the map.
	 */
	neighbors(x, y, diagonals = false) {
		const neighboring_cells = new Map();
		if (!this.inBounds(x, y)) {
			return neighboring_cells;
		}

		const neighbors_lookup = [
			['N', [x, y - 1]],
			['W', [x - 1, y]],
			['E', [x + 1, y]],
			['S', [x, y + 1]],
		];

		if (diagonals) {
			neighbors_lookup.push(
				['NW', [x - 1, y - 1]],
				['NE', [x + 1, y - 1]],
				['SW', [x - 1, y + 1]],
				['SE', [x + 1, y + 1]]
			);
		}

		for (let [key, coord] of neighbors_lookup) {
			let [cx, cy] = coord;
			if (this.inBounds(cx, cy)) {
				neighboring_cells.set(key, {
					id: InfiniteGrid.toId(cx, cy),
					coord,
					value: this.get(cx, cy),
				});
			}
		}

		return neighboring_cells;
	}

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @param {any} value
	 */
	set(x, y, value) {
		if (typeof x !== 'number' || typeof y !== 'number') {
			throw new Error(`x and y must be numbers, got (${typeof x})${x} and (${typeof y})${y}`);
		}
		if (x < this.min_x) this.min_x = x;
		if (x > this.max_x) this.max_x = x;
		if (y < this.min_y) this.min_y = y;
		if (y > this.max_y) this.max_y = y;
		const id = InfiniteGrid.toId(x, y);
		this.grid.set(id, value);
	}

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {any}
	 */
	get(x, y) {
		const id = InfiniteGrid.toId(x, y);
		if (!this.grid.has(id)) {
			this.set(x, y, this.defaultFactory(x, y));
		}
		return this.grid.get(id);
	}

	/**
	 * @param {RegExp|any} value
	 * @param {Boolean} [as_coords] - When true, the 2nd element of each array element returned is an Array of `[x, y]` number values, otherwise are string IDs.
	 * @returns {Array<[any,GridId|Coord]>} - Returns an Array, the first value matching the cell found, and the 2nd the coords or ID.
	 */
	findAll(value, as_coords = true) {
		const found = [];
		for (let [id, cell] of this.grid) {
			const check = value instanceof RegExp ? value.test(cell) : value === cell;
			if (check) {
				found.push([cell, as_coords ? InfiniteGrid.toCoords(id) : id]);
			}
		}

		return found;
	}

	inBounds(x, y) {
		if (x !== undefined && y !== undefined) {
			return x >= this.min_x && x <= this.max_x && y >= this.min_y && y <= this.max_y;
		} else if (x !== undefined && y === undefined) {
			return x >= this.min_x && x <= this.max_x;
		} else if (x === undefined && y !== undefined) {
			return y >= this.min_y && y <= this.max_y;
		}
	}

	clone({ empty = false } = {}) {
		const infinite_grid_clone = new InfiniteGrid();
		const new_map = new Map();
		if (!empty) {
			for (let [key, val] of this.grid) {
				new_map.set(key, typeof val === 'object' ? JSON.parse(JSON.stringify(val)) : val);
			}
		}
		infinite_grid_clone.defaultFactory = this.defaultFactory.bind(this);
		infinite_grid_clone.string_map = JSON.parse(JSON.stringify(this.string_map));
		infinite_grid_clone.grid = new_map;
		infinite_grid_clone.max_x = this.max_x;
		infinite_grid_clone.min_x = this.min_x;
		infinite_grid_clone.max_y = this.max_y;
		infinite_grid_clone.min_y = this.min_y;

		return infinite_grid_clone;
	}

	sum() {
		let sum = 0;
		for (let value of this.grid.values()) {
			sum += value;
		}

		return sum;
	}

	resize() {
		this.max_x = -Infinity;
		this.min_x = Infinity;
		this.max_y = -Infinity;
		this.min_y = Infinity;

		for (let id of this.grid.keys()) {
			let [x, y] = InfiniteGrid.toCoords(id);
			if (x < this.min_x) this.min_x = x;
			if (x > this.max_x) this.max_x = x;
			if (y < this.min_y) this.min_y = y;
			if (y > this.max_y) this.max_y = y;
		}
	}

	buildElevationFrontier(from_x, from_y) {
		const from_id = InfiniteGrid.toId(from_x, from_y);

		const frontier = [];
		frontier.push([from_x, from_y]);

		const came_from = new Map();
		came_from.set(from_id, null);
		while (frontier.length) {
			const current_coord = frontier.shift();
			console.log('front', frontier.length);
			const current_val = this.get(...current_coord);
			const neighbor_coords = this.neighbors(...current_coord).values();
			for (let { id: next_id, coord: next_coord, value: next_cell } of neighbor_coords) {
				if (next_cell - current_val > 1 || came_from.has(next_id)) {
					continue;
				}

				// Coord is walkable
				frontier.push(next_coord);

				came_from.set(next_id, InfiniteGrid.toId(...current_coord));
			}
		}

		return came_from;
	}

	getShortestElevationPath(from_x, from_y, to_x, to_y, { include_from = true } = {}) {
		const from_id = InfiniteGrid.toId(from_x, from_y);
		const to_id = InfiniteGrid.toId(to_x, to_y);
		const came_from = this.buildElevationFrontier(from_x, from_y);
		let current = to_id;

		let path = [];
		while (current !== from_id) {
			path.push(current);
			console.log('path', path.length);
			current = came_from.get(current);
		}

		if (include_from) {
			path.push(from_id);
		}
		path.reverse();
		return path;
	}

	buildDijkstrasFrontier(from_x, from_y) {
		const from_id = InfiniteGrid.toId(from_x, from_y);

		// Sort our frontier by its priority, so we pick nodes to visit that have the lowest cost.
		const frontier = new Heap((node_a, node_b) => node_a.priority - node_b.priority);
		frontier.push({ id: from_id, priority: 0 });

		const came_from = new Map([[from_id, null]]);
		const cost_so_far = new Map([[from_id, 0]]);
		while (!frontier.empty()) {
			const current = frontier.pop();

			const [current_x, current_y] = InfiniteGrid.toCoords(current.id);

			for (let next of this.neighbors(current_x, current_y).values()) {
				const new_cost = cost_so_far.get(current.id) + next.value;
				if (!cost_so_far.has(next.id) || new_cost < cost_so_far.get(next.id)) {
					cost_so_far.set(next.id, new_cost);
					frontier.push({ id: next.id, priority: new_cost });
					came_from.set(next.id, current.id);
				}
			}
		}

		return came_from;
	}

	getShortestWeightedPath(from_x, from_y, to_x, to_y, { include_from = true } = {}) {
		const from_id = InfiniteGrid.toId(from_x, from_y);
		const to_id = InfiniteGrid.toId(to_x, to_y);
		const came_from = this.buildDijkstrasFrontier(from_x, from_y);
		let current = to_id;

		let path = [];
		while (current !== from_id) {
			path.push(current);
			current = came_from.get(current);
		}

		if (include_from) {
			path.push(from_id);
		}
		path.reverse();
		return path;
	}

	toGrid() {
		let grid = [];
		for (let y = this.min_y; y <= this.max_y; y++) {
			let row = [];
			for (let x = this.min_x; x <= this.max_x; x++) {
				let cell = this.get(x, y);
				row.push(cell);
			}
			grid.push(row);
		}

		return grid;
	}

	toJSON() {
		return this.toGrid();
	}

	toString() {
		let grid = this.toGrid();
		let rows = '';
		for (let y = 0; y < grid.length; y++) {
			let row = '';
			for (let x = 0; x < grid[y].length; x++) {
				let cell = grid[y][x];
				let cell_string = cell in this.string_map ? this.string_map[cell] : String(cell);
				row += cell_string;
			}
			rows += rows.length ? '\n' + row : row;
		}

		return rows;
	}

	*[Symbol.iterator]() {
		yield* this.grid.entries();
	}

	entries() {
		return this.grid.entries();
	}

	values() {
		return this.grid.values();
	}

	keys() {
		return this.grid.keys();
	}
}

module.exports = {
	InfiniteGrid,
};
