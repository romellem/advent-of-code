/**
 * @typedef {[Number, Number]} Coord
 */

/**
 * @typedef {String} Id - The x and y coords concatenated with a ","
 */

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

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {Map<Id, { coord: Coord, came_from: Coord, distance: Number }>}
	 */
	buildFrontierFrom(x, y) {
		// Arrays as FIFO queues can be slow for large lengths, but should be fine here
		const frontier = [];
		const came_from = new Map();
		frontier.push({ coord: [x, y], distance: 0 });
		came_from.set(InfiniteGrid.toId(x, y), { coord: [x, y], distance: 0 });
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
					coord: next_coord,
					came_from: current_coord,
					distance: distance + 1,
				});
			}
		}

		return came_from;
	}

	/**
	 * Not an optimized pathfinding algorithm
	 * @param {[Number, Number]} param0
	 * @param {[Number, Number]} param1
	 * @returns {?Number}
	 */
	shortestDistance([from_x, from_y], [to_x, to_y]) {
		const came_from = this.buildFrontierFrom(from_x, from_y);
		for (let { coord, distance } of came_from.values()) {
			let [x, y] = coord;
			if (x === to_x && y === to_y) {
				return distance;
			}
		}
	}

	/**
	 * @returns {InfiniteGrid}
	 */
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
	 * @returns {Array<[any, Id|Coord]>} - Returns an Array, the first value matching the cell found, and the 2nd the coords or ID.
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
	 * Resets current grid and applies cells from a grid array to our map.
	 * @param {String|Array<Array<any>>} grid_str_or_arr - If a string is passed, string is first split into 2D array.
	 * @returns {void}
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

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {Boolean}
	 */
	inBounds(x, y) {
		return x >= this.min_x && x <= this.max_x && y >= this.min_y && y <= this.max_y;
	}

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Boolean} [in_bounds_check]
	 * @returns {Map<"N"|"W"|"E"|"S", { coord: [Number, Number], value: any }} Return a map with optional keys N, W, E, S (if those beighbors are within the bounds of the map)
	 */
	neighbors(x, y, in_bounds_check = true) {
		const neighboring_cells = new Map();
		if (in_bounds_check && !this.inBounds(x, y)) {
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
			if (in_bounds_check && this.inBounds(cx, cy)) {
				neighboring_cells.set(key, { coord, value: this.get(cx, cy) });
			}
		}

		return neighboring_cells;
	}

	/**
	 * Clears out `this.grid` and unsets min and max xy values.
	 * @returns {Map} Returns the old grid we just cleared.
	 */
	reset() {
		const old_grid = this.grid;
		this.grid = new Map();
		this.max_x = -Infinity;
		this.min_x = Infinity;
		this.max_y = -Infinity;
		this.min_y = Infinity;

		return old_grid;
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

	setAll(value) {
		for (let id of this.grid.keys()) {
			this.grid.set(id, value);
		}
	}

	/**
	 * @returns {Number} When we have a grid of numbers, loops over all cells and sums their values.
	 */
	sum() {
		let sum = 0;
		for (let value of this.grid.values()) {
			sum += value;
		}

		return sum;
	}

	/**
	 * @returns {[Number, Number]} Returns a tuple of `[width, height]` of cells that are set
	 */
	size() {
		const width = Math.abs(this.max_x - this.min_x) + 1;
		const height = Math.abs(this.max_y - this.min_y) + 1;
		return [width, height];
	}

	/**
	 * @param {Number|"top-left"|"top-right"|"bottom-left"|"bottom-right"} x - Can be a string, one of "top-left", "top-right", "bottom-left", or "bottom-right"
	 * @param {Number} [y]
	 */
	centerAt(x, y) {
		if (typeof x === 'string') {
			switch (x) {
				case 'top-left':
					x = this.min_x;
					y = this.min_y;
					break;
				case 'top-right':
					x = this.max_x;
					y = this.min_y;
					break;
				case 'bottom-left':
					x = this.min_x;
					y = this.max_y;
					break;
				case 'bottom-right':
					x = this.max_x;
					y = this.max_y;
					break;
				default:
					throw new Error(`Invalid enum for centerAt() call: ${x}`);
			}
		}
		
		let original_grid = this.reset();
		for (let [coord_id, value] of original_grid) {
			let [cell_x, cell_y] = InfiniteGrid.toCoords(coord_id);
			this.set(cell_x - x, cell_y - y, value);
		}
	}

	/**
	 * @returns {Array<Array<any>>} Returns a 2D array of our grid from its min/max edges.
	 */
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

	/**
	 * @returns {String}
	 */
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