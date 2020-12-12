const EMPTY = 'L';
const OCCUPIED = '#';
const FLOOR = '.';

class Grid {
	constructor(initial_grid_state) {
		this.original_grid_str = JSON.stringify(initial_grid_state);
		this.grid = JSON.parse(JSON.stringify(initial_grid_state));
	}

	reset() {
		this.grid = JSON.parse(this.original_grid_str);
	}

	getFirstInDir(values, _x, _y, [h, v]) {
		let x = _x + h;
		let y = _y + v;
		while (this.grid[y] && this.grid[y][x]) {
			if (values.includes(this.grid[y][x])) {
				return [x, y];
			}
			x += h;
			y += v;
		}

		return;
	}

	getVisualNeighbors(x, y) {
		return [
			this.getFirstInDir([OCCUPIED, EMPTY], x, y, [0, -1]), // top
			this.getFirstInDir([OCCUPIED, EMPTY], x, y, [1, -1]), // top right
			this.getFirstInDir([OCCUPIED, EMPTY], x, y, [1, 0]), // right
			this.getFirstInDir([OCCUPIED, EMPTY], x, y, [1, 1]), // bottom right
			this.getFirstInDir([OCCUPIED, EMPTY], x, y, [0, 1]), // bottom
			this.getFirstInDir([OCCUPIED, EMPTY], x, y, [-1, 1]), // bottom left
			this.getFirstInDir([OCCUPIED, EMPTY], x, y, [-1, 0]), // left
			this.getFirstInDir([OCCUPIED, EMPTY], x, y, [-1, -1]), // top left
		]
			.filter((v) => v)
			.filter(([_x, _y]) => typeof (this.grid[_y] && this.grid[_y][_x]) !== 'undefined')
			.map(([_x, _y]) => this.grid[_y][_x]);
	}

	getNeighbors(x, y) {
		// prettier-ignore
		let neighbors = [
            [x, y - 1],     // top
            [x + 1, y - 1], // top right
            [x + 1, y],     // right
            [x + 1, y + 1], // bottom right
            [x, y + 1],     // bottom
            [x - 1, y + 1], // bottom left
            [x - 1, y],     // left
            [x - 1, y - 1], // top left
        ].filter(([_x, _y]) => typeof (this.grid[_y] && this.grid[_y][_x]) !== 'undefined');

		return neighbors.map(([_x, _y]) => this.grid[_y][_x]);
	}

	run({ part }) {
		let changed;
		do {
			let new_grid_state = Array(this.grid.length)
				.fill()
				.map(() => Array(this.grid[0].length).fill());
			changed = false;

			for (let y = 0; y < this.grid.length; y++) {
				for (let x = 0; x < this.grid[0].length; x++) {
					let cell = this.grid[y][x];

					let neighbors =
						part === 1 ? this.getNeighbors(x, y) : this.getVisualNeighbors(x, y);
					let occupied_neighbors = 0;
					let empty_neighbords = 0;

					neighbors.forEach((n) => {
						if (n === OCCUPIED) occupied_neighbors++;
						else if (n === EMPTY) empty_neighbords++;
					});

					if (cell === FLOOR) {
						new_grid_state[y][x] = FLOOR;
					} else if (cell === EMPTY) {
						if (occupied_neighbors === 0) {
							new_grid_state[y][x] = OCCUPIED;
							changed = true;
						} else new_grid_state[y][x] = EMPTY;
					} else if (cell === OCCUPIED) {
						if (occupied_neighbors >= (part === 1 ? 4 : 5)) {
							new_grid_state[y][x] = EMPTY;
							changed = true;
						} else new_grid_state[y][x] = OCCUPIED;
					} else {
						console.error('err');
					}
				}
			}

			// Update our real grid
			this.grid = new_grid_state;
		} while (changed);

		return this.countType();
	}

	countType(type = OCCUPIED) {
		let count = 0;
		for (let y = 0; y < this.grid.length; y++) {
			for (let x = 0; x < this.grid[0].length; x++) {
				if (this.grid[y][x] === type) {
					count++;
				}
			}
		}

		return count;
	}

	printGrid() {
		let grid_str = this.grid.map((row) => row.join('')).join('\n');

		console.log(grid_str + '\n');
	}
}

module.exports = { Grid };
