const gcd = (a, b) => {
	if (b === 0) return a;
	return gcd(b, a % b);
};

class Grid {
	constructor(input) {
		// `1` is an asteroid, `0` is open space
		this.grid = JSON.parse(JSON.stringify(input));
		this.asteroids = this.getAsteroidsList();

		this.min_x = 0;
		this.min_y = 0;
		this.max_x = this.grid[0].length - 1;
		this.max_y = this.grid.length - 1;

		// To be iteratered over later (stores coord in [y, x] format)
		this.top_edge = Array(this.grid[0].length)
			.fill(0)
			.map((_, x) => [0, x]);
		this.bottom_edge = Array(this.grid[0].length)
			.fill(0)
			.map((_, x) => [this.max_y, x]);
		this.left_edge = Array(this.grid.length)
			.fill(0)
			.map((_, y) => [y, 0]);
		this.right_edge = Array(this.grid.length)
			.fill(0)
			.map((_, y) => [y, this.max_x]);
	}

	getAsteroidsList() {
		let asteroids = [];
		for (let y = 0; y < this.grid.length; y++) {
			for (let x = 0; x < this.grid[y].length; x++) {
				if (this.grid[y][x]) {
					asteroids.push([x, y]);
				}
			}
		}

		return asteroids;
	}

	getEdgePointsFrom([x, y]) {
		const top = y === 0;
		const right = x === this.grid[0].length - 1;
		const bottom = y === this.grid.length - 1;
		const left = x === 0;

		let points = [];
		if (!top) points.push(...this.top_edge);
		if (!right) points.push(...this.right_edge);
		if (!bottom) points.push(...this.bottom_edge);
		if (!left) points.push(...this.left_edge);

		return points;
	}

	getVectorsFromPoint(coord) {
		let slopes = {};
		const [x1, y1] = coord;

		// This isn't optimized (its O(n^2)) but it works for grids of this size.
		for (let y2 = 0; y2 <= this.max_y; y2++) {
			for (let x2 = 0; x2 <= this.max_x; x2++) {
				if (x1 === x2 && y1 === y2) {
					continue;
				}

				let rise = y2 - y1;
				let run = x2 - x1;

				let divisor = Math.abs(gcd(rise, run));
				rise /= divisor;
				run /= divisor;

				slopes[`${rise}/${run}`] = true;
			}
		}

		const vectors_to_travel = Object.keys(slopes).map(slope_str =>
			slope_str.split('/').map(v => parseInt(v, 10))
		);

		return vectors_to_travel;
	}

	// Part one
	getAsteroidWithHighestCountInLineOfSight() {
		let best_count = -1;
		let best_coords = null;
		for (let asteroid of this.asteroids) {
			let vectors = this.getVectorsFromPoint(asteroid);
			let count = vectors
				.map(vector => this.getCollisionAlongVector(asteroid, vector) ? 1 : 0)
				.reduce((a, b) => a + b, 0);

			if (count > best_count) {
				best_count = count;
				best_coords = asteroid;
			}
		}

		return {
			best_count,
			best_coords,
		};
	}

	getCollisionAlongVector(from, vector) {
		let collision_coord = null;
		const [x, y] = from;
		const [vy, vx] = vector;
		let new_x = x + vx;
		let new_y = y + vy;

		while (this.pointInGrid(new_x, new_y)) {
			if (this.grid[new_y][new_x]) {
				collision_coord = [new_x, new_y];
				break;
			}
			new_x += vx;
			new_y += vy;
		}

		return collision_coord;
	}

	pointInGrid(x, y) {
		return x >= this.min_x && x <= this.max_x && y >= this.min_y && y <= this.max_y;
	}
}

module.exports = Grid;
