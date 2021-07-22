class InfiniteGrid {
	/**
	 * @param {Object} options
	 * @param {Function<x, y>} [options.defaultFactory] - Defaults to returning 0 for new coords
	 * @param {Object} [options.string_map] - Map grid values to strings.
	 */
	constructor({ defaultFactory = (x, y) => 0, string_map = {} } = {}) {
		this.defaultFactory = defaultFactory;
		this.string_map = string_map;
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

	get(x, y) {
		const id = InfiniteGrid.toId(x, y);
		if (!this.grid.has(id)) {
			this.set(x, y, this.defaultFactory(x, y));
		}
		return this.grid.get(id);
	}

	/**
	 * @param {RegExp|any} value
	 * @param {Boolean} [as_coords] - When true, returns a Map of `[x, y]` number values, otherwise returns a Map of string IDs.
	 * @returns {Map} - Returns a Map, with keys showing the value found (useful when a regex is passed).
	 */
	findAll(value, as_coords = true) {
		const found = new Map();
		for (let [id, cell] of this.grid) {
			const check = value instanceof RegExp ? value.test(cell) : value === cell;
			if (check) {
				found.set(cell, as_coords ? InfiniteGrid.toCoords(id) : id);
			}
		}

		return found;
	}

	inBounds(x, y) {
		return x >= this.min_x && x <= this.max_x && y >= this.min_y && y <= this.max_y;
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

	sum() {
		let sum = 0;
		for (let value of this.grid.values()) {
			sum += value;
		}

		return sum;
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
