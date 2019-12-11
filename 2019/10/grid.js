const gcd = (a, b) => {
	if (b === 0) return a;
	return gcd(b, a % b);
};

/**
 * Given an x,y point, returns an angle 0-360
 * such that the top of the circle is 0, and then
 * we rotate clockwise.
 *
 * So in the below ascii circle, if you start at
 * point `0`, then you'll visit the points 1, 2, 3,
 * etc., in order.
 *
 *      9 0 1
 *     8     2
 *     7     3
 *      6 5 4
 */
const coordToAngle = (x, y) => {
	let deg = (Math.atan2(-y, x) * 180) / Math.PI;

	// Pretty sure this can be simplified with a modulus, but can't see it
	if (deg <= 90 && deg >= 0) {
		deg = Math.abs(deg - 90);
	} else if (deg < 0) {
		deg = Math.abs(deg) + 90;
	} else {
		deg = 450 - deg;
	}

	return deg;
};

/**
 * @param {Array} coord
 */
const memoizedCoordToAngle = (() => {
	let lookup = {};
	return ([y, x]) => {
		const coord = `${x},${y}`;
		if (lookup[coord] !== undefined) {
			return coord;
		}

		return coordToAngle(x, y);
	};
})();

class Grid {
	constructor(input) {
		// `1` is an asteroid, `0` is open space
		this.grid = JSON.parse(JSON.stringify(input));
		this.asteroids = this.getAsteroidsList();

		this.min_x = 0;
		this.min_y = 0;
		this.max_x = this.grid[0].length - 1;
		this.max_y = this.grid.length - 1;
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

	getVectorsFromPoint(coord, sorted_clockwise = false) {
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

		if (sorted_clockwise) {
			vectors_to_travel.sort((p1, p2) => {
				let p1_d = memoizedCoordToAngle(p1);
				let p2_d = memoizedCoordToAngle(p2);
				return p1_d - p2_d;
			});
		}

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

	// Part two
	vaporizeAsteroidsFrom(start_from) {
		if (!start_from) {
			({ best_coords: start_from } = this.getAsteroidWithHighestCountInLineOfSight());
		}
		
		let total_vaporized = 0;
		let vaporized = [];
		do {
			let clockwise_vectors_from_start = this.getVectorsFromPoint(start_from, true);
			for (let vector of clockwise_vectors_from_start) {
				let collision_coord = this.getCollisionAlongVector(start_from, vector);
				if (collision_coord) {
					total_vaporized++;
					this.vaporize(collision_coord);
					vaporized.push(collision_coord);
				}

				if (total_vaporized === 200) {
					let [x, y] = collision_coord;
					console.log(x, y);
					return (x * 100) + y;
				}
			}
		} while (this.sumAllAsteroids() > 1);
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

	vaporize([y, x]) {
		this.grid[y][x] = 0;
	}

	pointInGrid(x, y) {
		return x >= this.min_x && x <= this.max_x && y >= this.min_y && y <= this.max_y;
	}

	sumAllAsteroids() {
		let sum = 0;
		for (let y = 0; y < this.grid.length; y++) {
			for (let x = 0; x < this.grid[y].length; x++) {
				sum += this.grid[y][x];
			}
		}

		return sum;
	}
}

module.exports = Grid;
