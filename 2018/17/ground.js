const Jimp = require('jimp');

/**
 * @typedef {Object} InputValues
 * @property {Array<Array<Number>>} grid
 * @property {Number} min_x
 * @property {Number} max_x
 * @property {Number} min_y
 * @property {Number} max_y
 */

/**
 * @typedef {Object} SurroundingCoords
 * @property {Number} N
 * @property {Number} NW
 * @property {Number} NE
 * @property {Number} E
 * @property {Number} W
 * @property {Number} S
 * @property {Number} SW
 * @property {Number} SE
 */

class Grid {
	constructor(raw_input) {
		if (!raw_input) {
			return this;
		}

		const { grid, min_x, max_x, min_y, max_y } = Grid.parseInput(raw_input);
		this.grid = grid;
		this.min_x = min_x;
		this.max_x = max_x;
		this.min_y = min_y;
		this.max_y = max_y;
	}

	/**
	 * @param {String} num_or_range
	 * @example parseNumOrRange("100") // returns [100]
	 * @example parseNumOrRange("5..8") // returns [5, 6, 7, 8]
	 * @returns Array<Number>
	 */
	static parseNumOrRange(num_or_range) {
		if (num_or_range.includes('..')) {
			let [num_a, num_b] = num_or_range.split('..');
			num_a = parseInt(num_a);
			num_b = parseInt(num_b);
			return Array(num_b - num_a + 1)
				.fill()
				.map((_, i) => num_a + i);
		} else {
			let num = parseInt(num_or_range);
			if (Number.isNaN(num)) {
				throw new Error(`Failed to parse "${num_or_range}"`);
			}
			return [num];
		}
	}

	static toCoordString = ({ x, y }) => `${x},${y}`;

	/**
	 * @param {String} raw_input Your raw input, with whitespace trimmed
	 * @returns {InputValues}
	 */
	static parseInput(raw_input) {
		const grid_map = {};
		const lines = raw_input.split('\n');
		for (let raw_line of lines) {
			let [, axis_a, range_a, axis_b, range_b] =
				/^(x|y)=(\d+\.?\.?\d*), (x|y)=(\d+\.?\.?\d*)$/.exec(raw_line);
			let nums_a = Grid.parseNumOrRange(range_a);
			let nums_b = Grid.parseNumOrRange(range_b);
			for (let a of nums_a) {
				for (let b of nums_b) {
					/**
					 * Part of the key is here: our input is given as xy or yx.
					 * By putting the values into an object and then destructuring,
					 * order doesn't matter: I always will get an `x,y` string.
					 */
					let key = Grid.toCoordString({ [axis_a]: a, [axis_b]: b });
					grid_map[key] = 1;
				}
			}
		}

		const coords = Object.keys(grid_map).map((coord_str) =>
			coord_str.split(',').map((v) => parseInt(v))
		);
		let min_x = Number.MAX_SAFE_INTEGER;
		let max_x = 0;
		let max_y = 0;
		for (let [x, y] of coords) {
			if (x < min_x) {
				min_x = x;
			}
			if (x > max_x) {
				max_x = x;
			}
			if (y > max_y) {
				max_y = y;
			}
		}
		min_x -= 1;
		max_x += 1;
		// y doesn't get a row of "buffer," water only extends to maximum clay coord

		/**
		 * 1. y starts at 0, so `max_y - 0 = max_y` (plus 1 for 0-indexed)
		 * 2. This stores extra 0s to pad the columns, but makes later calculations easier to not account for offsets
		 */
		const grid = Array(max_y + 1)
			.fill()
			.map((_) => Array(max_x + 1).fill(0));
		for (let [x, y] of coords) {
			grid[y][x] = 1;
		}

		return {
			grid,
			min_x,
			max_x,
			min_y: 0,
			max_y,
		};
	}

	get trimmed() {
		return Array(this.grid.length)
			.fill()
			.map((_, y) => this.grid[y].slice(this.min_x));
	}

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {SurroundingCoords}
	 */
	getSurrounding(x, y) {
		let N, NW, NE;
		if (y > this.min_y) {
			N = this.grid[y - 1][x];
			NW = this.grid[y - 1][x - 1];
			NE = this.grid[y - 1][x + 1];
		}

		let E = this.grid[y][x + 1];
		let W = this.grid[y][x - 1];

		let S, SW, SE;
		if (y < this.max_y) {
			S = this.grid[y + 1][x];
			SW = this.grid[y + 1][x - 1];
			SE = this.grid[y + 1][x + 1];
		}

		return { N, NW, NE, E, W, S, SW, SE };
	}

	/**
	 * All "peeks" can be called with two params, x/y,
	 * or an object `{ x, y }`
	 */
	peekNorth(x, y) {
		if (typeof x === 'object') ({x, y}) = x;
		return this.grid[y - 1]?.[x];
	}
	peekSouth(x, y) {
		if (typeof x === 'object') ({x, y}) = x;
		return this.grid[y + 1]?.[x];
	}
	peekEast(x, y) {
		if (typeof x === 'object') ({x, y}) = x;
		return this.grid[y]?.[x + 1];
	}
	peekWest(x, y) {
		if (typeof x === 'object') ({x, y}) = x;
		return this.grid[y]?.[x - 1];
	}

	mark({ x, y, fromX, toX, as }) {
		if (fromX !== undefined && toX !== undefined && this.grid[y]) {
			for (let px = fromX; px <= toX; px++) {
				this.grid[y][px] = as;
			}
		} else if (this.grid[y]) {
			this.grid[y][x] = as;
		}
	}

	clone() {
		const new_grid = new Grid();
		new_grid.grid = JSON.parse(JSON.stringify(this.grid));
		new_grid.min_x = this.min_x;
		new_grid.max_x = this.max_x;
		new_grid.min_y = this.min_y;
		new_grid.max_y = this.max_y;

		return new_grid;
	}

	toString(trimmed = true) {
		return this.grid
			.map((row) => {
				let line = row.map((v) => (v === 1 ? '#' : '.')).join('');
				if (trimmed) {
					line = line.slice(Math.max(this.min_x - 1, 0));
				}
				return line;
			})
			.join('\n');
	}
}

class Ground {
	constructor({ grid, spring_x = 500, spring_y = 0 }) {
		this.grid = grid;
		this.spring_x = spring_x;
		this.spring_y = spring_y;
	}

	static createDrip(x, y) {
		return { x, y };
	}

	fill() {
		const grid = this.grid.clone();
		// Init with single drip
		const drips = [Ground.createDrip(this.spring_x, this.spring_y)];
		return this._fill(grid, drips);
	}

	_fill(grid, drips) {
		while (drips.length) {
			for (let drip of drips) {

			}
		}
	}

	/**
	 * @returns {Promise<Buffer>} Returns a PNG buffer, which can then be written out to a file
	 */
	async toImage(trimmed = true) {
		const BLACK = Jimp.cssColorToHex('#000000');
		const BLUE = Jimp.cssColorToHex('#0000FF');

		const grid_instance = this.grid;
		const grid = trimmed ? grid_instance.trimmed : grid_instance.grid;

		const image = await (new Promise((resolve, reject) => {
			new Jimp(grid[0].length, grid.length, '#FFFFFF', (err, image) => {
				if (err) {
					reject(err);
				} else {
					resolve(image);
				}
			});
		}));

		for (let y = 0; y < grid.length; y++) {
			let row = grid[y];
			for (let x = 0; x < row.length; x++) {
				let cell = row[x];
				if (cell) {
					image.setPixelColor(BLACK, x, y);
				}
			}
		}

		let spring_x = trimmed
			? this.spring_x - this.grid.min_x
			: this.spring_x;
		image.setPixelColor(BLUE, spring_x, this.spring_y);

		const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
		return buffer;
	}

	toString(trimmed = true) {
		let grid_str = this.grid.toString(trimmed);
		let spring_x = trimmed
			? this.spring_x - this.grid.min_x
			: this.spring_x;

		// Spring is a '+' char in the first row
		return (
			grid_str.substring(0, spring_x) +
			'+' +
			grid_str.substring(spring_x + 1)
		);
	}
}

module.exports = {
	Grid,
	Ground,
};
