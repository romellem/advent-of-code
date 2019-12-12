const G = require('generatorics');

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

		return position === initial_position && velocity === 0
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

	orbitUntilRepeat() {
		
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
