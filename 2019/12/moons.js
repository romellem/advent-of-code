const G = require('generatorics');

// @link https://en.wikipedia.org/wiki/Euclidean_algorithm#Implementations
const gcd = (a, b) => {
	if (b === 0) return a;
	return gcd(b, a % b);
};

// @link https://github.com/nickleefly/node-lcm/blob/5d44997/index.js
const _lcm = (a, b) => {
	if (b === 0) return 0;
	return (a * b) / gcd(a, b);
};

// @link https://stackoverflow.com/a/147523/864233
const lcm = (...args) => args.reduce((a, b) => _lcm(a, b));

class Moon {
	constructor([x, y, z]) {
		this.initial_x = x;
		this.x = x;
		this.vx = 0;

		this.initial_y = y;
		this.y = y;
		this.vy = 0;

		this.initial_z = z;
		this.z = z;
		this.vz = 0;
	}

	move(dimensions) {
		for (let dimension of dimensions) {
			let velocity = `v${dimension}`;
			this[dimension] += this[velocity];
		}
	}

	getPotentialEnergy() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}

	getKineticEnergy() {
		return Math.abs(this.vx) + Math.abs(this.vy) + Math.abs(this.vz);
	}

	getTotalEnergy() {
		return this.getPotentialEnergy() * this.getKineticEnergy();
	}

	toString() {
		return `${this.x},${this.y},${this.z},${this.vx},${this.vy},${this.vz}`;
	}

	// @param {Enum<string>} - A dimension, 'x', 'y', or 'z'
	atStart(dimension) {
		const position = this[dimension];
		const initial_position = this[`initial_${dimension}`];
		const velocity = this[`v${dimension}`];

		return position === initial_position && velocity === 0;
	}
}

class Moons {
	constructor(moons) {
		this.moons = moons.map(moon_position => new Moon(moon_position));
		this.time = 0;

		this.time_dimensions = { x: 0, y: 0, z: 0 };
	}

	orbit(steps = 1000) {
		do {
			this.applyGravity();
			this.updatePositions();
			this.time++;
		} while (this.time < steps);

		return this.getTotalEnergy();
	}

	/**
	 * This was a tough one. Not sure I would have been able to
	 * figure it out on my own; the trick is fairly subtle.
	 * 
	 * The idea is that, the planets are periodic _on a single dimension_.
	 * So imagine if they only moved in the 'x' dimension. If after n_x ticks
	 * all the planets were back at their original position and original
	 * velocity, then we'd begin the period again.
	 * 
	 * Since then that the planets can only affect each other within
	 * a single dimension at a time, what we do is calculate the period
	 * for _each_ dimension separately. Once we have those periods,
	 * we get the least common multiple (LCM) between them.
	 * 
	 * So the trick is two-fold:
	 * 
	 * - Calculate the period for the four planets _within each dimension separately._
	 * - Calculate the _LCM_ between those periods.
	 */
	orbitUntilRepeat() {
		for (let dimension of ['x', 'y', 'z']) {
			let at_start = false;
			while (!at_start) {
				this.applyGravity([dimension]);
				this.updatePositions([dimension]);
				this.time_dimensions[dimension]++;

				at_start = this.moons.every(moon => moon.atStart(dimension));
			}
		}

		return lcm(...Object.values(this.time_dimensions));
	}

	applyGravity(dimensions = ['x', 'y', 'z']) {
		for (let pair of G.combination(this.moons, 2)) {
			Moons.applyGravityToTwoMoons(pair, dimensions);
		}
	}

	static applyGravityToTwoMoons([moon_a, moon_b], dimensions) {
		for (let position of dimensions) {
			let velocity = `v${position}`;

			// If the positions on a given axis are the same,
			// the velocity on that axis does not change for that pair of moons.
			if (moon_a[position] > moon_b[position]) {
				moon_a[velocity]--;
				moon_b[velocity]++;
			} else if (moon_a[position] < moon_b[position]) {
				moon_a[velocity]++;
				moon_b[velocity]--;
			}
		}
	}

	updatePositions(dimensions = ['x', 'y', 'z']) {
		for (let moon of this.moons) {
			moon.move(dimensions);
		}
	}

	getTotalEnergy() {
		return this.moons.map(moon => moon.getTotalEnergy()).reduce((a, b) => a + b, 0);
	}
}

module.exports = Moons;
