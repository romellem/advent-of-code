const { intersection } = require('lodash');

class Planet {
	constructor(name) {
		this.name = name;
		this.orbits;
	}

	setOrbits(planet) {
		this.orbits = planet;
	}

	count() {
		return this.orbits ? 1 + this.orbits.count() : 0;
	}

	listToCom() {
		let ps = [];
		let o = this.orbits;
		while (o) {
			ps.push(o.name);
			o = o.orbits;
		}

		return ps;
	}
}

class OrbitMap {
	constructor(input) {
		this.planets = {};

		// Create all planets
		for (let [p1, p2] of input) {
			if (!this.planets[p1]) {
				this.planets[p1] = new Planet(p1);
			}

			if (!this.planets[p2]) {
				this.planets[p2] = new Planet(p2);
			}
		}

		// Connect planets
		for (let [p1, p2] of input) {
			this.planets[p2].setOrbits(this.planets[p1]);
		}
	}

	// Part one
	getTotalOrbits() {
		const sum = Object.values(this.planets)
			.map(p => p.count())
			.reduce((a, b) => a + b);
		return sum;
	}

	// Part two
	getTransfersBetween(p1 = 'YOU', p2 = 'SAN') {
		const p1_to_com = this.planets[p1].listToCom();
		const p2_to_com = this.planets[p2].listToCom();

		// In lodash's `intersection`, " The order and references of result values are determined by the first array."
		const first_common_planet = intersection(p1_to_com, p2_to_com)[0];
		const p1_distance_to_first_common_planet = p1_to_com.indexOf(first_common_planet);
		const p2_distance_to_first_common_planet = p2_to_com.indexOf(first_common_planet);

		return p1_distance_to_first_common_planet + p2_distance_to_first_common_planet;
	}
}

module.exports = OrbitMap;
