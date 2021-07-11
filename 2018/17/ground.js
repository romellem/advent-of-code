const Jimp = require('jimp');
const fs = require('fs-extra');

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

const SAND = 0;
const CLAY = 1;
const FLOWING = 2;
const SETTLED = 3;

const ASCII_LOOKUP = {
	[SAND]: '.',
	[CLAY]: '#',
	[FLOWING]: '|',
	[SETTLED]: '~',
};

const LIGHT_GRAY = Jimp.cssColorToHex('#EAEAEA');
const BLACK = Jimp.cssColorToHex('#000000');
const RED = Jimp.cssColorToHex('#FF0000');
const CYAN = Jimp.cssColorToHex('#00FFFF');
const BLUE = Jimp.cssColorToHex('#0000FF');

class Point {
	constructor(x, y) {
		if (typeof x === 'string') {
			// Treat string args as coordinates `x,y`
			let [split_x, split_y] = x.split(',');
			x = parseInt(split_x);
			y = parseInt(split_y);
		}
		this.x = x;
		this.y = y;
	}

	moveTo(x, y) {
		if (typeof x === 'object') ({ x, y } = x);
		this.x = x;
		this.y = y;
	}

	moveNorth() {
		this.y -= 1;
		return this;
	}
	north() {
		return new Point(this.x, this.y - 1);
	}

	moveSouth() {
		this.y += 1;
		return this;
	}
	south() {
		return new Point(this.x, this.y + 1);
	}

	moveEast() {
		this.x += 1;
		return this;
	}
	east() {
		return new Point(this.x + 1, this.y);
	}

	moveWest() {
		this.x -= 1;
		return this;
	}
	west() {
		return new Point(this.x - 1, this.y);
	}

	getGrid(grid) {
		return grid[this.y]?.[this.x];
	}

	toString() {
		return `${this.x},${this.y}`;
	}
}

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

	static isClayOrSettled(cell) {
		return cell === CLAY || cell === SETTLED;
	}

	/**
	 * @param {String} raw_input Your raw input, with whitespace trimmed
	 * @returns {InputValues}
	 */
	static parseInput(raw_input) {
		const grid_set = new Set();
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
					grid_set.add(key);
				}
			}
		}

		const coords = [...grid_set].map((coord_str) =>
			coord_str.split(',').map((v) => parseInt(v))
		);
		let min_x = Number.MAX_SAFE_INTEGER;
		let max_x = 0;
		let min_y = Number.MAX_SAFE_INTEGER;
		let max_y = 0;
		for (let [x, y] of coords) {
			if (x < min_x) {
				min_x = x;
			}
			if (x > max_x) {
				max_x = x;
			}

			if (y < min_y) {
				min_y = y;
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
			.map((_) => Array(max_x + 1).fill(SAND));
		for (let [x, y] of coords) {
			grid[y][x] = CLAY;
		}

		return {
			grid,
			min_x,
			max_x,
			min_y,
			max_y,
		};
	}

	get trimmed() {
		return Array(this.grid.length)
			.fill()
			.map((_, y) => this.grid[y].slice(this.min_x));
	}

	/**
	 * All "peeks" can be called with two params, x/y,
	 * or an object `{ x, y }`
	 */
	peekNorth(x, y) {
		if (typeof x === 'object') ({ x, y } = x);
		return this.grid[y - 1]?.[x];
	}
	peekSouth(x, y) {
		if (typeof x === 'object') ({ x, y } = x);
		return this.grid[y + 1]?.[x];
	}
	peekEast(x, y) {
		if (typeof x === 'object') ({ x, y } = x);
		return this.grid[y]?.[x + 1];
	}
	peekWest(x, y) {
		if (typeof x === 'object') ({ x, y } = x);
		return this.grid[y]?.[x - 1];
	}

	peek(x, y) {
		if (typeof x === 'object') ({ x, y } = x);
		return this.grid[y]?.[x];
	}

	mark({ x, y, fromX, toX, as: obj_as }, alt_as) {
		if (this.grid[y] !== undefined) {
			if (fromX !== undefined && toX !== undefined) {
				let increment = fromX <= toX ? 1 : -1;
				for (let px = fromX; px <= toX; px += increment) {
					this.grid[y][px] = obj_as ?? alt_as;
				}
			} else {
				this.grid[y][x] = obj_as ?? alt_as;
			}
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
				let line = row.map((v) => ASCII_LOOKUP[v]).join('');
				if (trimmed) {
					line = line.slice(Math.max(this.min_x - 1, 0));
				}
				return line;
			})
			.join('\n');
	}

	sum() {
		const sums = {
			[SAND]: 0,
			[CLAY]: 0,
			[FLOWING]: 0,
			[SETTLED]: 0,
		};

		for (let y = this.min_y; y <= this.max_y; y++) {
			let row = this.grid[y];
			for (let col of row) {
				sums[col]++;
			}
		}
		return sums;
	}
}

let IMAGE_SLICE_CAMERA_Y = 0;

// This value was determined from running through everything once and noting what the max
// interval was between min and max y
const MAX_FRAME_HEIGHT = 175;

class Ground {
	constructor({ grid, spring_x = 500, spring_y = 0 }) {
		this.grid = grid;
		this.original_grid = grid.clone();
		this.spring_x = spring_x;
		this.spring_y = spring_y;
	}

	static SAND = SAND;
	static CLAY = CLAY;
	static FLOWING = FLOWING;
	static SETTLED = SETTLED;

	async fill(output_frames = false) {
		// Reset camera y coord, only useful if `output_frames` is true
		IMAGE_SLICE_CAMERA_Y = 0;

		const grid = this.grid.clone();
		// Init with single drip
		let drips = new Set([new Point(this.spring_x, this.spring_y)]);

		const images = [];
		while (drips.size > 0) {
			if (output_frames) {
				let image_buffer = await this.toImageSlice({
					drips,
					grid_instance: grid,
					callback: async ({ image, drips, grid_instance }) => {
						image = image.scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR);
						const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
						return buffer;
					},
				});
				images.push(image_buffer);
			}

			let new_drips = [];
			for (let drip of drips) {
				if (drip.y >= this.grid.max_y) {
					drips.delete(drip);
					continue;
				}

				if (grid.peek(drip) === SETTLED) {
					// Happen when two drips meet clay: the first one settles, 2nd one should skip
					drip.moveNorth();
					continue;
				}

				let below_drip = grid.peekSouth(drip);
				if (below_drip === SAND) {
					grid.mark(drip.moveSouth(), FLOWING);
				} else if (Grid.isClayOrSettled(below_drip)) {
					// Flow left
					let left_drip = drip;
					let barrier_left, flow_left;
					while (!barrier_left && !flow_left) {
						let below_left_drip = grid.peekSouth(left_drip);
						if (!Grid.isClayOrSettled(below_left_drip)) {
							// Will flow downwards
							flow_left = left_drip;
						} else if (Grid.isClayOrSettled(grid.peekWest(left_drip))) {
							// Technically is space just to right of barrier
							barrier_left = left_drip;
						} else {
							left_drip = left_drip.west();
						}
					}

					// Flow right
					let right_drip = drip;
					let barrier_right, flow_right;
					while (!barrier_right && !flow_right) {
						let below_right_drip = grid.peekSouth(right_drip);
						if (!Grid.isClayOrSettled(below_right_drip)) {
							// Will flow downwards
							flow_right = right_drip;
						} else if (Grid.isClayOrSettled(grid.peekEast(right_drip))) {
							// Technically is space just to left of barrier
							barrier_right = right_drip;
						} else {
							right_drip = right_drip.east();
						}
					}

					if (barrier_left && barrier_right) {
						grid.mark({
							y: barrier_left.y,
							fromX: barrier_left.x,
							toX: barrier_right.x,
							as: SETTLED,
						});
						drip.moveNorth();
					} else if (barrier_left && flow_right) {
						grid.mark({
							y: barrier_left.y,
							fromX: barrier_left.x,
							toX: flow_right.x,
							as: FLOWING,
						});
						drip.moveTo(flow_right);
					} else if (barrier_right && flow_left) {
						grid.mark({
							y: barrier_right.y,
							fromX: flow_left.x,
							toX: barrier_right.x,
							as: FLOWING,
						});
						drip.moveTo(flow_left);
					} else if (flow_left && flow_right) {
						grid.mark({
							y: flow_left.y,
							fromX: flow_left.x,
							toX: flow_right.x,
							as: FLOWING,
						});
						drip.moveTo(flow_left);
						new_drips.push(flow_right);
					} else {
						throw new Error('Should not happen');
					}
				} else {
					// Already flowing, delete this drip
					drips.delete(drip);
				}
			}

			// Add all new drips after we finished our iterations (don't iterate over new drips in middle of loop)
			for (let new_drip of new_drips) {
				drips.add(new_drip);
			}

			// De-dup drips based on unique coordinates
			let deduped_drip_coords = new Set([...drips].map((v) => v.toString()));
			if (deduped_drip_coords.size < drips.size) {
				let deduped_drips = new Set();
				for (let drip_coord of deduped_drip_coords) {
					deduped_drips.add(new Point(drip_coord));
				}
				drips = deduped_drips;
			}
		}

		if (output_frames) {
			// Creates frames folder if it doesn't exist
			fs.emptyDirSync('frames');
			const frames_length = String(images.length).length;

			for (let i = 0; i < images.length; i++) {
				let file = `frames/frame_${i
					.toString()
					.padStart(frames_length, '0')}.png`;
				fs.writeFileSync(file, images[i]);
			}
		}

		this.grid = grid;

		return grid.sum();
	}

	/**
	 * @param {Object} options
	 * @param {Boolean} [options.trimmed]
	 * @param {Grid} [options.grid_instance]
	 * @param {Function} [options.callback] - Called with `({ image, grid_instance })`.
	 * @returns {Promise<Jimp|unknown>} Returns a Jimp instance, or the await'd return of `callback`
	 */
	async toImage({ trimmed = true, grid_instance = this.grid, callback } = {}) {
		const grid = trimmed ? grid_instance.trimmed : grid_instance.grid;

		const image = await new Promise((resolve, reject) => {
			new Jimp(grid[0].length, grid.length, '#FFFFFF', (err, image) => {
				if (err) {
					reject(err);
				} else {
					resolve(image);
				}
			});
		});

		for (let y = 0; y < grid.length; y++) {
			let row = grid[y];
			for (let x = 0; x < row.length; x++) {
				let cell = row[x];
				switch (cell) {
					case CLAY:
						image.setPixelColor(BLACK, x, y);
						break;
					case FLOWING:
						image.setPixelColor(CYAN, x, y);
						break;
					case SETTLED:
						image.setPixelColor(BLUE, x, y);
						break;
					default:
						break;
				}
			}
		}

		let spring_x = trimmed ? this.spring_x - grid_instance.min_x : this.spring_x;
		image.setPixelColor(RED, spring_x, this.spring_y);

		let return_value = image;
		if (typeof callback === 'function') {
			return_value = await callback({ image, grid_instance });
		}

		return return_value;
	}

	/**
	 * @param {Object} options
	 * @param {Set} [options.drips] - A Set of `Point` instances.
	 * @param {Grid} [options.grid_instance]
	 * @param {Function} [options.callback] - Called with `({ image, drips, grid_instance })`.
	 * @returns {Promise<Buffer>} Returns a PNG buffer, which can then be written out to a file
	 */
	async toImageSlice({ drips, grid_instance, callback } = {}) {
		const grid = grid_instance.trimmed;

		let min_y;
		let max_y;
		for (let drip of drips) {
			if (max_y === undefined || drip.y > max_y) {
				max_y = drip.y;
			}
			if (min_y === undefined || drip.y < min_y) {
				min_y = drip.y;
			}
		}
		min_y -= 40;
		max_y += 40;
		min_y = Math.max(min_y, 0);
		max_y = Math.min(max_y, grid_instance.max_y);

		if (max_y > IMAGE_SLICE_CAMERA_Y + MAX_FRAME_HEIGHT) {
			IMAGE_SLICE_CAMERA_Y += max_y - (IMAGE_SLICE_CAMERA_Y + MAX_FRAME_HEIGHT);
		}

		const image = await new Promise((resolve, reject) => {
			new Jimp(grid[0].length, MAX_FRAME_HEIGHT, '#FFFFFF', (err, image) => {
				if (err) {
					reject(err);
				} else {
					resolve(image);
				}
			});
		});

		for (
			let y = IMAGE_SLICE_CAMERA_Y;
			y <= IMAGE_SLICE_CAMERA_Y + MAX_FRAME_HEIGHT;
			y++
		) {
			let row = grid[y];
			if (!row) {
				console.log('no row');
				row = Array(grid[0].length).fill();
			}
			for (let x = 0; x < row.length; x++) {
				let cell = row[x];
				switch (cell) {
					case SAND:
						break;
					case CLAY:
						image.setPixelColor(BLACK, x, y - IMAGE_SLICE_CAMERA_Y);
						break;
					case FLOWING:
						image.setPixelColor(CYAN, x, y - IMAGE_SLICE_CAMERA_Y);
						break;
					case SETTLED:
						image.setPixelColor(BLUE, x, y - IMAGE_SLICE_CAMERA_Y);
						break;
					default:
						image.setPixelColor(LIGHT_GRAY, x, y - IMAGE_SLICE_CAMERA_Y);
						break;
				}
			}
		}

		if (IMAGE_SLICE_CAMERA_Y === 0) {
			let spring_x = this.spring_x - grid_instance.min_x;
			image.setPixelColor(RED, spring_x, this.spring_y);
		}

		let return_value = image;
		if (typeof callback === 'function') {
			return_value = await callback({ image, drips, grid_instance });
		}

		return return_value;
	}

	reset() {
		this.grid = this.original_grid.clone();
	}

	toString(trimmed = true) {
		let grid_str = this.grid.toString(trimmed);
		let spring_x = trimmed ? this.spring_x - this.grid.min_x : this.spring_x;

		// Spring is a '+' char in the first row
		return grid_str.substring(0, spring_x) + '+' + grid_str.substring(spring_x + 1);
	}
}

module.exports = {
	Grid,
	Ground,
};
