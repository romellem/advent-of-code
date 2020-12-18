const ACTIVE = '#';
const INACTIVE = '.';

class InfiniteNDimensionalGrid {
	constructor({ intial_grid, dimensions, part }) {
		this.original_grid_str = JSON.stringify(intial_grid);
		this.dimensions = dimensions;
		this.part = part;

		/**
		 * If we have three dimensions, the keys would be `x,y,z`
		 */
		this.grid = this.parseArraysToGrid(JSON.parse(this.original_grid_str));
		this.neighbor_cache = {};
	}

	getMinMaxFromGrid(grid) {
		let coords = Object.keys(grid).map(c => c.split(','));
		let min = Array(this.dimensions).fill(Number.MAX_SAFE_INTEGER);
		let max = Array(this.dimensions).fill(Number.MIN_SAFE_INTEGER);
		for (let d = 0; d < this.dimensions; d++) {
			for (let coord of coords) {
				if (coord[d] < min[d]) min[d] = coord[d];
				if (coord[d] > max[d]) max[d] = coord[d];
			}
		}
		return [min, max]
	}

	parseArraysToGrid(arrays, depth = 1, coord = [], grid = {}) {
		for (let d = 0; d < arrays.length; d++) {
			let dim = arrays[d];
			coord.unshift(d);
			if (Array.isArray(dim)) {
				this.parseArraysToGrid(dim, depth + 1, coord, grid);
			} else {
				grid[coord.join(',')] = dim;
			}
			coord.shift();
		}

		return grid;
	}

	/**
	 * @param {Array} coord
	 */
	getNeighbordCoords(coord) {
		const coord_str = coord.join(',');
		if (!this.neighbor_cache[coord_str]) {
			this.neighbor_cache[coord_str] = this._getNeighbordCoords(coord);
		}

		return this.neighbor_cache[coord_str];
	}

	/**
	 * @param {Array} coord
	 * @param {Number} [depth]
	 * @param {Array} [vector]
	 * @param {Array} [neighbors]
	 */
	_getNeighbordCoords(coord, depth = 1, vector = [], neighbors = []) {
		for (let v of [1, -1, 0]) {
			vector.push(v);
			if (depth === this.dimensions) {
				let point = coord.map((p, i) => p + vector[i]).join(',');
				if (point !== coord.join(',')) {
					neighbors.push(point);
				}
			} else {
				this._getNeighbordCoords(coord, depth + 1, vector, neighbors);
			}
			vector.pop();
		}

		return neighbors;
	}

	/**
	 * @param {String} coord
	 * @param {Boolean} [removeUndefined=false]
	 * @returns {Array} - Returns an array of coordinates that can be looked up in `this.grid`
	 */
	getNeighbors(coord, removeUndefined = false) {
		let coord_arr = coord.split(',').map((v) => parseInt(v, 10));
		let neighbors = this.getNeighbordCoords(coord_arr);
		if (removeUndefined) {
			neighbors = neighbors.filter((v) => this.grid[v] !== undefined);
		}
		return neighbors;
	}

	getValues(coords, totals = [ACTIVE, INACTIVE]) {
		let counts = totals.reduce((obj, v) => ((obj[v] = 0), obj), {});
		for (let coord of coords) {
			let type = this.grid[coord] || INACTIVE;
			counts[type] += 1;
		}

		return counts;
	}

	saveUndefinedCoords(coords, map, defaultValue = INACTIVE) {
		for (let coord of coords) {
			if (this.grid[coord] === undefined) {
				map[coord] = defaultValue;
			}
		}
	}

	tick() {
		let extra_neighbors = {};
		let new_grid = {};
		let coords = Object.entries(this.grid);
		for (let [coord, value] of coords) {
			let neighbors = this.getNeighbors(coord);
			this.saveUndefinedCoords(neighbors, extra_neighbors);
			let neighbor_values = this.getValues(neighbors);
			if (value === ACTIVE) {
				// If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active.
				if (neighbor_values[ACTIVE] === 2 || neighbor_values[ACTIVE] === 3) {
					new_grid[coord] = ACTIVE;
				} else {
					// Otherwise, the cube becomes inactive.
					new_grid[coord] = INACTIVE;
				}
			} else if (value === INACTIVE) {
				// If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active.
				if (neighbor_values[ACTIVE] === 3) {
					new_grid[coord] = ACTIVE;
				} else {
					// Otherwise, the cube remains inactive.
					new_grid[coord] = INACTIVE;
				}
			}
		}

		for (let [coord, value] of Object.entries(extra_neighbors)) {
			let neighbors = this.getNeighbors(coord);
			let neighbor_values = this.getValues(neighbors);
			if (value === INACTIVE) {
				// If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active.
				if (neighbor_values[ACTIVE] === 3) {
					new_grid[coord] = ACTIVE;
				} else {
					// Otherwise, the cube remains inactive.
					// Don't write, to keep our grid size small
				}
			} else if (value === ACTIVE) {
				throw 'Something went wrong!';
			}
		}

		this.grid = new_grid;
		return this;
	}

	run(steps = 1) {
		for (let i = 0; i < steps; i++) {
			this.tick();
		}
	}

	reset() {
		this.grid = JSON.parse(this.original_grid_str);
	}
}

module.exports = { InfiniteNDimensionalGrid, ACTIVE, INACTIVE };
