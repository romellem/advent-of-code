const G = require('generatorics');

class Moon {
	constructor([x, y, z]) {
		this.x = x;
		this.vx = 0;

		this.y = y;
		this.vy = 0;

		this.z = z;
		this.vz = 0;
	}

	move() {
		this.x += this.vx;
		this.y += this.vy;
		this.z += this.vz;
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
		return `p:<${this.x}, ${this.y}, ${this.z}> v:<${this.vx}, ${this.vy}, ${this.vz}>`;
	}
}

class Moons {
	constructor(moons) {
		this.moons = moons.map(moon_position => new Moon(moon_position));
		this.time = 0;
	}

	orbit(steps = 1000) {
		do {
			this.applyGravity();
			this.updatePositions();
			this.time++;
		} while (this.time < steps);

		return this.getTotalEnergy();
	}

	applyGravity() {
		for (let pair of G.combination(this.moons, 2)) {
			Moons.applyGravityToTwoMoons(pair);
		}
	}

	static applyGravityToTwoMoons([moon_a, moon_b]) {
		for (let position of ['x', 'y', 'z']) {
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

	updatePositions() {
		for (let moon of this.moons) {
			moon.move();
		}
	}

	getTotalEnergy() {
		return this.moons.map(moon => moon.getTotalEnergy()).reduce((a, b) => a + b, 0);
	}

	// For debugging
	get _() {
		return this.moons.map(m => m.toString());
	}
}

module.exports = Moons;
