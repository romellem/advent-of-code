class InfiniteGrid {
	/**
	 * @param {Object} options
	 * @param {Function<x, y>} [options.defaultFactory] - Defaults to returning 0 for new coords
	 * @param {Object} [options.string_map] - Map grid values to strings.
	 * @param {Object} [options.walls] - Mark values that are walls / not walkable (truthy)
	 */
	constructor({ defaultFactory = (x, y) => 0, string_map = {}, walls = {} } = {}) {
		this.defaultFactory = defaultFactory.bind(this);
		this.string_map = string_map;
		this.walls = walls;
		this.grid = new Map();
		this.max_x = -Infinity;
		this.min_x = Infinity;
		this.max_y = -Infinity;
		this.min_y = Infinity;
	}

	static toId(x, y) {
		return `${x},${y}`;
	}

	static toCoords(id, return_as_object = false) {
		let [x, y] = id.split(',');
		x = parseInt(x, 10);
		y = parseInt(y, 10);
		return return_as_object ? { x, y } : [x, y];
	}

	static split(two_dimensional_string) {
		return two_dimensional_string.split('\n').map((row) => row.split(''));
	}

	buildFrontierFrom(x, y) {
		// Arrays as FIFO queues can be slow for large lengths
		const frontier = [];
		const came_from = new Map();
		frontier.push({ coord: [x, y], distance: 0 });
		came_from.set(InfiniteGrid.toId(x, y), { coord: null, distance: 0 });
		while (frontier.length > 0) {
			const { coord: current_coord, distance } = frontier.shift();
			const neighbor_coords = this.neighbors(...current_coord).values();
			for (let { coord: next_coord, value: next_cell } of neighbor_coords) {
				if (this.walls[next_cell]) {
					continue;
				}

				const next_id = InfiniteGrid.toId(...next_coord);
				if (came_from.has(next_id)) {
					continue;
				}

				// Coord is walkable
				frontier.push({
					coord: next_coord,
					distance: distance + 1,
				});

				came_from.set(next_id, {
					coord: current_coord,
					distance: distance + 1,
				});
			}
		}

		return came_from;
	}

	clone() {
		const infinite_grid_clone = new InfiniteGrid();
		const new_map = new Map();
		for (let [key, val] of this.grid) {
			new_map.set(
				key,
				typeof val === 'object' ? JSON.parse(JSON.stringify(val)) : val
			);
		}
		infinite_grid_clone.defaultFactory = this.defaultFactory.bind(this);
		infinite_grid_clone.string_map = Object.assign({}, this.string_map);
		infinite_grid_clone.walls = Object.assign({}, this.walls);
		infinite_grid_clone.grid = new_map;
		infinite_grid_clone.max_x = this.max_x;
		infinite_grid_clone.min_x = this.min_x;
		infinite_grid_clone.max_y = this.max_y;
		infinite_grid_clone.min_y = this.min_y;

		return infinite_grid_clone;
	}

	/**
	 * @param {RegExp|any} value
	 * @param {Boolean} [as_coords=true] - When true, returns an Array of `[x, y]` number values, otherwise returns the string ID for the cell.
	 * @returns {Array<[any,Id|Coord]>} - Returns an Array, the first value matching the cell found, and the 2nd the coords or ID.
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

	get(x, y) {
		const id = InfiniteGrid.toId(x, y);
		if (!this.grid.has(id)) {
			this.set(x, y, this.defaultFactory(x, y));
		}
		return this.grid.get(id);
	}

	/**
	 * Resets current grid and applies cells from a grid array to our map.
	 * @param {String|Array} grid_str_or_arr - If a string is passed, string is first split into 2D array.
	 */
	import(grid_str_or_arr) {
		let grid_arr = grid_str_or_arr;
		if (typeof grid_arr === 'string') {
			grid_arr = InfiniteGrid.split(grid_arr);
		}

		this.reset();

		for (let y = 0; y < grid_arr.length; y++) {
			for (let x = 0; x < grid_arr[y].length; x++) {
				this.set(x, y, grid_arr[y][x]);
			}
		}
	}

	inBounds(x, y) {
		return x >= this.min_x && x <= this.max_x && y >= this.min_y && y <= this.max_y;
	}

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {Map} Return a map with optional keys N, W, E, S (if those neights are within the bounds of the map)
	 */
	neighbors(x, y) {
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

		for (let [key, coord] of neighbors_lookup) {
			let [cx, cy] = coord;
			if (this.inBounds(cx, cy)) {
				neighboring_cells.set(key, { coord, value: this.get(cx, cy) });
			}
		}

		return neighboring_cells;
	}

	reset() {
		this.grid = new Map();
		this.max_x = -Infinity;
		this.min_x = Infinity;
		this.max_y = -Infinity;
		this.min_y = Infinity;
	}

	set(x, y, value) {
		if (typeof x !== 'number' || typeof y !== 'number') {
			throw new Error(
				`x and y must be numbers, got (${typeof x})${x} and (${typeof y})${y}`
			);
		}
		if (x < this.min_x) this.min_x = x;
		if (x > this.max_x) this.max_x = x;
		if (y < this.min_y) this.min_y = y;
		if (y > this.max_y) this.max_y = y;
		const id = InfiniteGrid.toId(x, y);
		this.grid.set(id, value);
	}

	sum() {
		let sum = 0;
		for (let value of this.grid.values()) {
			sum += value;
		}

		return sum;
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

	toString() {
		let grid = this.toGrid();
		let rows = '';
		for (let y = 0; y < grid.length; y++) {
			let row = '';
			for (let x = 0; x < grid[y].length; x++) {
				let cell = grid[y][x];
				let cell_string =
					cell in this.string_map ? this.string_map[cell] : String(cell);
				row += cell_string;
			}
			rows += rows.length ? '\n' + row : row;
		}

		return rows;
	}
}

module.exports = {
	InfiniteGrid,
};
